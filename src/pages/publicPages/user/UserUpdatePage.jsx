import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
  Input,
  SubmitButton,
  FormItem,
  DatePicker,
  Form as FormikForm,
} from 'formik-antd'
import { useUpdateUser } from '@/hooks/authentication/useUpdateUser'
import { useUser } from '@/hooks/authentication/useUser'
import Container from '@/components/ui/Container'
import LoadingComponent from '@/components/common/Loading.component'

const UpdateUserSchema = Yup.object().shape({
  name: Yup.string().required('Full name is required'),
  birthdate: Yup.date().required('Birthdate is required'),
  password: Yup.string(),
})

export default function UserUpdatePage() {
  const { user } = useUser()
  const { updateUser, isUpdating } = useUpdateUser()

  if (!user) return <LoadingComponent />

  return (
    <Container>
      <Formik
        enableReinitialize
        initialValues={{
          name: user.name || '',
          birthdate: user.birthdate || null,
          password: '',
        }}
        validationSchema={UpdateUserSchema}
        onSubmit={(values) => {
          updateUser({
            password: values.password,
            newDataUserInfo: {
              name: values.name,
              birthdate: values.birthdate,
            },
          })
        }}
      >
        <FormikForm className='max-w-sm p-4 bg-white shadow rounded flex flex-col gap-4'>
          <FormItem name='name' label='Full Name'>
            <Input
              name='name'
              placeholder='Enter full name'
              disabled={isUpdating}
            />
          </FormItem>

          <FormItem name='birthdate' label='Birthdate'>
            <DatePicker
              name='birthdate'
              format='YYYY-MM-DD'
              disabled={isUpdating}
            />
          </FormItem>

          <FormItem name='password' label='New Password'>
            <Input.Password
              name='password'
              placeholder='Enter new password'
              disabled={isUpdating}
            />
          </FormItem>

          <SubmitButton
            loading={isUpdating}
            className='bg-blue-500 text-white px-4 py-2 rounded'
          >
            {isUpdating ? 'Updating...' : 'Update'}
          </SubmitButton>
        </FormikForm>
      </Formik>
    </Container>
  )
}
