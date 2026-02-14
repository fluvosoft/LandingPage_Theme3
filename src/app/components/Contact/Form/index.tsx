'use client'
import React from 'react'
import { useState, useEffect } from 'react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phnumber: '',
    Message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [showThanks, setShowThanks] = useState(false)
  const [loader, setLoader] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    const isValid = Object.values(formData).every(
      (value) => value.trim() !== ''
    )
    setIsFormValid(isValid)
  }, [formData])
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  const reset = () => {
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      phnumber: '',
      Message: '',
    })
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoader(true)

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://88.222.245.134:8080/api'
    const customerId = process.env.NEXT_PUBLIC_CUSTOMER_ID || 'string22'

    fetch(`${apiBaseUrl}/customers/${customerId}/contact`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: formData.firstname,
        lastName: formData.lastname,
        email: formData.email,
        phoneNumber: formData.phnumber,
        details: formData.Message,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json()
        }
        throw new Error('Failed to submit contact form')
      })
      .then((data) => {
        setSubmitted(true)
        setShowThanks(true)
        reset()
        setLoader(false)

        setTimeout(() => {
          setShowThanks(false)
        }, 5000)
      })
      .catch((error) => {
        setLoader(false)
        console.error('Error submitting contact form:', error.message)
        alert('Failed to submit contact form. Please try again.')
      })
  }
  return (
    <section id='contact'>
      <div className='container'>
        <div className='relative'>
          <h2 className='mb-9 font-bold tracking-tight'>Get in Touch</h2>
          <form
            onSubmit={handleSubmit}
            className='flex flex-wrap w-full m-auto justify-between'>
            <div className='sm:flex gap-3 w-full'>
              <div className='mx-0 my-2.5 flex-1'>
                <label htmlFor='fname' className='pb-3 inline-block text-base'>
                  First Name
                </label>
                <input
                  id='fname'
                  type='text'
                  name='firstname'
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder='John'
                  className='w-full text-base px-4 rounded-2xl py-2.5 border-solid border transition-all duration-500 focus:border-primary focus:outline-0'
                />
              </div>
              <div className='mx-0 my-2.5 flex-1'>
                <label htmlFor='lname' className='pb-3 inline-block text-base'>
                  Last Name
                </label>
                <input
                  id='lname'
                  type='text'
                  name='lastname'
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder='Doe'
                  className='w-full text-base px-4 rounded-2xl py-2.5 border-solid border transition-all duration-500 focus:border-primary focus:outline-0'
                />
              </div>
            </div>
            <div className='sm:flex gap-3 w-full'>
              <div className='mx-0 my-2.5 flex-1'>
                <label htmlFor='email' className='pb-3 inline-block text-base'>
                  Email address
                </label>
                <input
                  id='email'
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='john.doe@example.com'
                  className='w-full text-base px-4 rounded-2xl py-2.5 border-solid border transition-all duration-500 focus:border-primary focus:outline-0'
                />
              </div>
              <div className='mx-0 my-2.5 flex-1'>
                <label
                  htmlFor='Phnumber'
                  className='pb-3 inline-block text-base'>
                  Phone Number
                </label>
                <input
                  id='Phnumber'
                  type='tel'
                  name='phnumber'
                  placeholder='+1234567890'
                  value={formData.phnumber}
                  onChange={handleChange}
                  className='w-full text-base px-4 rounded-2xl py-2.5 border-solid border transition-all duration-500 focus:border-primary focus:outline-0'
                />
              </div>
            </div>
            <div className='w-full mx-0 my-2.5 flex-1'>
              <label htmlFor='message' className='text-base inline-block'>
                Message
              </label>
              <textarea
                id='message'
                name='Message'
                value={formData.Message}
                onChange={handleChange}
                className='w-full mt-2 rounded-2xl px-5 py-3 border-solid border transition-all duration-500 focus:border-primary focus:outline-0'
                placeholder='Anything else you wanna communicate'></textarea>
            </div>
            <div className='mx-0 my-2.5 w-full'>
              <button
                type='submit'
                disabled={!isFormValid || loader}
                className={`border leading-none px-6 text-lg font-medium py-4 rounded-full 
                    ${
                      !isFormValid || loader
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-primary border-primary text-white hover:bg-transparent hover:text-primary cursor-pointer'
                    }`}>
                Submit
              </button>
            </div>
          </form>
          {showThanks && (
            <div className='text-white bg-primary rounded-full px-4 text-lg mb-4.5 mt-1 absolute flex items-center gap-2'>
              Thank you for contacting us! We will get back to you soon.
              <div className='w-3 h-3 rounded-full animate-spin border-2 border-solid border-white border-t-transparent'></div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ContactForm
