import { USER_DEFAULT_BALANCE } from "@/constants";

import supabase from "@/services/supabase";

export async function signup(email, password, newUserInfo) {
  try {
    const { data: dataUser, errorUSer } = await supabase.auth.signUp({
      email,
      password,
    });

    if (errorUSer) throw errorUSer;

    const { error: errorUserInfo } = await supabase
      .from("userInfo")
      .insert([{ ...newUserInfo, userId: dataUser.user.id }]);

    if (errorUserInfo) throw errorUserInfo;
  } catch (error) {
    throw error;
  }
}

export async function getUserInfo(id) {
  try {
    const { data, error } = await supabase.from("userInfo").select("*").eq("userId", id).single();

    if (error) return null;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function login(email, password) {
  try {
    const { data: dataUser, error: errorUser } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (errorUser) throw errorUser;

    const dataUserInfo = await getUserInfo(dataUser.user.id);

    const data = { email: dataUser.user.email, ...dataUserInfo };
    return data;
  } catch (error) {
    throw error;
  }
}

export async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/",
      },
    });
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
  } catch (error) {
    throw error;
  }
}

export async function updateCurrentUser({ password, newDataUserInfo }) {
  try {
    let updateDataUser;
    if (password) updateDataUser = { password };

    const { data: dataUser, error: errorUser } = await supabase.auth.updateUser(updateDataUser);

    if (errorUser) throw errorUser;
    const { data: dataUserInfo, error: errorUserInfo } = await supabase
      .from("userInfo")
      .update({ ...newDataUserInfo })
      .eq("userId", dataUser.user.id)
      .select()
      .single();

    if (errorUserInfo) throw errorUserInfo;

    const data = { email: dataUser.user.email, ...dataUserInfo };

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) return null;

    const { data: dataUser, error: errorUser } = await supabase.auth.getUser();

    if (errorUser) throw errorUser;
    debugger;
    let dataUserInfo = await getUserInfo(dataUser.user.id);
    if (!dataUserInfo) {
      const { data: insertedUserInfo, error } = await supabase
        .from("userInfo")
        .insert([
          {
            name: "Customer Temp",
            role: "customer",
            userId: dataUser.user.id,
            moneyBalance: USER_DEFAULT_BALANCE,
            status: "active",
          },
        ])
        .select()
        .single();

      if (error) throw error;

      dataUserInfo = insertedUserInfo;
    }

    const data = { email: dataUser.user.email, ...dataUserInfo };

    return data;
  } catch (error) {
    throw error;
  }
}

export async function resetPassword(email) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/update-password/",
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
}

export async function updatePassword(newPassword) {
  try {
    const { data: dataUser, error: errorUser } = await supabase.auth.updateUser({ password: newPassword });

    if (errorUser) throw errorUser;

    const { data: dataUserInfo, error: errorUserInfo } = await getUserInfo(dataUser.user.id);

    const data = { email: dataUser.user.email, ...dataUserInfo };
    return data;
  } catch (error) {
    throw error;
  }
}
