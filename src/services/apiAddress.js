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
