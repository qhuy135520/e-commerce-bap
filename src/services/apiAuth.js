import supabase, { supabaseUrl } from './supabase'

export async function signup() {
  const { data, error } = await supabase.auth.signUp({
    email: 'huyltqse135@gmail.com',
    password: '---------',
    options: {
      data: {
        fullName: 'Kelly Adams',
        avatar:
          'https://bkvluluamjybttmxgmoz.supabase.co/storage/v1/object/public/Image/avt-2.jpg',
        birthdate: '1995-18-11',
        degree: '',
        phoneNumber: '0352607701',
        address: 'New York, USA',
      },
    },
  })

  if (error) throw new Error(error.message)
  return data
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error(error.message)
}

export async function updateCurrentUser(updateData) {

  const { error } = await supabase.auth.updateUser({
    data: updateData,
  })
  if (error) throw new Error(error.message)

  const { data: freshData, error: fetchError } = await supabase.auth.getUser()
  if (fetchError) throw new Error(fetchError.message)
    
  return freshData.user.user_metadata
}
