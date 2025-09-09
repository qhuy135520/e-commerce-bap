import supabase from "@/services/supabase";

export async function fetchAddressUserApi(userId) {
  try {
    const { data: address, error } = await supabase.from("address").select("*").eq("userId", userId);

    if (error) {
      throw error;
    }

    return address;
  } catch (error) {
    throw error;
  }
}

export async function fetchAddressLocation(lat, lng) {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);

    if (!res.ok) {
      throw new Error("Failed to fetch address");
    }

    const data = await res.json();

    if (!data?.display_name) {
      throw new Error("Not found address");
    }

    return data.display_name;
  } catch (err) {
    throw new Error("Unknown error when fetching address");
  }
}

export async function addAddressApi({ userId, fullAddress, phone, name, isDefault }) {
  try {
    const { data, error } = await supabase
      .from("address")
      .insert([
        {
          userId,
          fullAddress,
          phone,
          name,
          isDefault,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateAddressApi({ newAddress }) {
  try {
    const { error } = await supabase.from("address").update(newAddress).eq("id", newAddress.id);

    if (error) throw error;
  } catch (error) {
    throw error;
  }
}

export async function updateDefaultAddressApi({ id, userId }) {
  try {
    const { error: errorUpdateAllAddress } = await supabase
      .from("address")
      .update({ isDefault: false })
      .eq("userId", userId);

    if (errorUpdateAllAddress) throw errorUpdateAllAddress;

    const { error: errorDefaultAddress } = await supabase.from("address").update({ isDefault: true }).eq("id", id);

    if (errorDefaultAddress) throw errorDefaultAddress;
  } catch (error) {
    throw error;
  }
}

export async function removeAddressApi(id) {
  try {
    const { error } = await supabase.from("address").delete().eq("id", id);
    if (error) throw error;
  } catch (error) {
    throw error;
  }
}
