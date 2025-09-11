import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import supabase from "@/services/supabase";

const generateOrderId = () => {
  const timestamp = Date.now();
  const uuid = crypto.randomUUID();
  return `ORDER_${timestamp}_${uuid}`;
};

export const deposit = createAsyncThunk("payment/deposit", async ({ amount }, { rejectWithValue }) => {
  try {
    const orderId = generateOrderId();
    const { data } = await axios.post(
      import.meta.env.VITE_FUNCTION_URL,
      { amount, orderId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
          apikey: import.meta.env.VITE_SUPABASE_KEY,
        },
      }
    );
    return data;
  } catch (error) {
    const msg = error?.response?.data?.error || error?.message || "Lỗi mạng";
    return rejectWithValue(msg);
  }
});

export const processDepositResult = createAsyncThunk(
  "payment/processDepositResult",
  async ({ responseCode, txnRef, amount }, { rejectWithValue }) => {
    if (!txnRef || !amount || !responseCode) {
      return rejectWithValue("Thông tin giao dịch không hợp lệ");
    }

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        return rejectWithValue("Không thể xác thực người dùng. Vui lòng đăng nhập lại.");
      }

      const { data: userProfile, error: profileError } = await supabase
        .from("userInfo")
        .select("role, moneyBalance")
        .eq("userId", user.id)
        .single();

      if (profileError || !userProfile) {
        return rejectWithValue("Không tìm thấy thông tin người dùng");
      }

      if (userProfile.role !== "customer") {
        return rejectWithValue("Chỉ khách hàng mới được nạp tiền");
      }

      const depositAmount = parseInt(amount) / 100;

      if (responseCode === "00") {
        const { data: existingTxn, error: checkError } = await supabase
          .from("transactions")
          .select("id")
          .eq("txn_ref", txnRef)
          .maybeSingle();

        if (checkError && checkError.code !== "PGRST116") {
          return rejectWithValue("Lỗi khi kiểm tra giao dịch: " + checkError.message);
        }

        if (!existingTxn) {
          const { error: insertError } = await supabase.from("transactions").insert({
            txn_ref: txnRef,
            user_id: user.id,
            amount: depositAmount,
            status: "success",
            type: "deposit",
            description: "Nạp tiền qua VNPay",
          });

          if (insertError) {
            return rejectWithValue("Ghi nhận giao dịch thất bại: " + insertError.message);
          }

          const { error: updateError } = await supabase
            .from("userInfo")
            .update({ moneyBalance: userProfile.moneyBalance + depositAmount })
            .eq("userId", user.id);

          if (updateError) {
            return rejectWithValue("Cập nhật số dư thất bại: " + updateError.message);
          }

          return {
            message: `Nạp tiền thành công! ${depositAmount.toLocaleString("vi-VN")} VND đã được cộng vào tài khoản.`,
            transactionStatus: "success",
          };
        } else {
          return {
            message: "Giao dịch đã được xử lý trước đó (lịch sử đã ghi nhận).",
            transactionStatus: "success",
          };
        }
      } else {
        await supabase.from("transactions").insert({
          txn_ref: txnRef,
          user_id: user.id,
          amount: depositAmount,
          status: "failed",
          type: "deposit",
          description: `Thanh toán thất bại (Mã lỗi: ${responseCode})`,
        });

        return {
          message: `Thanh toán thất bại (Mã lỗi: ${responseCode}). Vui lòng thử lại.`,
          transactionStatus: "failed",
        };
      }
    } catch (error) {
      return rejectWithValue(error.message || "Có lỗi xảy ra khi xử lý giao dịch");
    }
  }
);
