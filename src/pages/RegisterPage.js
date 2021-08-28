import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import '../assets/styles/RegisterForm.css'
import { PrimaryButton } from '../components/PrimaryButton'

function RegisterPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm()
  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = (data, e) => {
    e.target.reset()
    console.log(data)
  }

  return (
    <section className='register'>
      <div className='register__container'>
        <h2>Sign up to continue:</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='register__container--form'
        >
          {errors?.firstName?.type === 'required' && (
            <p>*First name is required</p>
          )}
          {errors?.firstName?.type === 'maxLength' && (
            <p>*First name cannot exceed 20 characters</p>
          )}
          {errors?.firstName?.type === 'pattern' && (
            <p>*Alphabetical characters only</p>
          )}
          <input
            type='text'
            name='firstName'
            placeholder='First name'
            className='form__field'
            {...register('firstName', {
              required: true,
              maxLength: 20,
              pattern: /^[A-Za-z]+$/i,
            })}
          />

          {errors?.lastName?.type === 'required' && (
            <p>*Last name is required</p>
          )}
          {errors?.lastName?.type === 'maxLength' && (
            <p>*First name cannot exceed 20 characters</p>
          )}
          {errors?.lastname?.type === 'pattern' && (
            <p>*Alphabetical characters only</p>
          )}
          <input
            type='text'
            placeholder='Last name'
            name='lastName'
            className='form__field'
            {...register('lastName', {
              required: true,
              maxLength: 20,
              pattern: /^[A-Za-z]+$/i,
            })}
          />

          {errors?.email?.type === 'required' && <p>*Email is required</p>}
          {errors?.email?.type === 'pattern' && (
            <p>*Please enter a valid email.</p>
          )}
          <input
            type='email'
            placeholder='Email'
            name='email'
            className='form__field'
            {...register('email', {
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            })}
          />

          {/* { {errors?.address?.type === 'required' && <p>*Address is required</p>}
          <input
            type='text'
            placeholder='Address'
            name='address'
            {...register('address', {
              required: true,
            })}
          /> } */}
          {/* {errors?.phoneNumber?.type === 'required' && (
            <p>*Phone number is required</p>
          )}
          {errors?.phoneNumber?.type === 'minLength' && (
            <p>*Phone number must be 7 characters</p>
          )}
          <input
            type='number'
            placeholder='Phone number'
            name='phoneNumber'
            {...register('phoneNumber', {
              required: true,
              minLength: 7,
            })}
          /> */}
          {errors?.password?.type === 'required' && (
            <p>*You must specify a password</p>
          )}
          {errors?.password?.type === 'pattern' && (
            <p>
              *Password must be at least 8 characters, one uppercase with one
              lowercase & one numeric character
            </p>
          )}
          <input
            type='password'
            placeholder='Password'
            name='password'
            {...register('password', {
              required: true,
              pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
            })}
          />
          {errors?.confirmPassword?.type === 'required' && (
            <p>*You must confirm the password</p>
          )}
          <input
            type='password'
            placeholder='Confirm password'
            name='confirmPassword'
            {...register('confirmPassword', {
              required: true,
              validate: value =>
                value === password.current || 'The passwords do not match',
            })}
          />
          <h3>Sign up as:</h3>
          {errors?.rol?.type === 'required' && <p>*You must select one</p>}
          <div className='register__container--form--options'>
            <label>
              User
              <input
                type='radio'
                name='user'
                value='User'
                {...register('rol', {
                  required: true,
                })}
              />
            </label>
            <label>
              Foundation
              <input
                type='radio'
                name='foundation'
                value='Foundation'
                {...register('rol', {
                  required: true,
                })}
              />
            </label>
          </div>
          {/* <label htmlFor='profilePic' id='fileUploadLabel'>
            Choose a profile picture:
          </label>
          <input type='file' name='profilePic' id='fileUpload' /> */}
          <PrimaryButton children={'Register'} />
        </form>
        <h4>
          Already a member? <a href='/'>Sign in </a>
        </h4>
      </div>
    </section>
  )
}

export { RegisterPage }
