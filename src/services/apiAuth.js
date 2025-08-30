import supabase, { supabaseUrl } from './supabase'

export async function signup(email, password, newUserInfo) {
  try {
    const { data: dataUser, errorUSer } = await supabase.auth.signUp({
      email,
      password,
    })

    if (errorUSer) throw errorUSer
    console.log(dataUser)

    const { error: errorUserInfo } = await supabase
      .from('userInfo')
      .insert([{ ...newUserInfo, userId: dataUser.user.id }])

    if (errorUserInfo) throw errorUserInfo
  } catch (error) {
    throw error
  }
}

export async function login(email, password) {
  try {
    const { data: dataUser, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) throw error

    const { data: dataUserInfo, error: errorUserInfo } = await supabase
      .from('userInfo')
      .select('*')
      .eq('userId', dataUser.user.id)
      .single()

    if (errorUserInfo) throw errorUserInfo

    const data = { email: dataUser.user.email, ...dataUserInfo }
    return data
  } catch (error) {
    throw error
  }
}

export async function logout() {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) throw error
  } catch (error) {
    throw error
  }
}

export async function updateCurrentUser(password, newDataUserInfo) {
  try {
    let updateDataUser
    if (password) updateDataUser = { password }

    const { data: dataUser, error: errorUser } = await supabase.auth.updateUser(
      updateDataUser
    )

    if (errorUser) throw errorUser
    const { data: dataUserInfo, error: errorUserInfo } = await supabase
      .from('userInfo')
      .update({ newDataUserInfo })
      .eq('userId', dataUser.user.id)
      .select()
      .single()

    if (errorUserInfo) throw errorUserInfo

    const data = { email: dataUser.user.email, ...dataUserInfo }

    return data
  } catch (error) {
    throw error
  }
}
