"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

async function fetchWithToken(url: string, options: RequestInit = {}) {
  const token = cookies().get("jwt_token")?.value
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }
  return fetch(url, { ...options, headers })
}

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const first_name = formData.get("first_name") as string
  const last_name = formData.get("last_name") as string
  const date_of_birth = formData.get("date_of_birth") as string

  try {
    const response = await fetch(`${API_URL}/user/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, first_name, last_name, date_of_birth }),
    })

    if (response.ok) {
      revalidatePath("/login")
      return { success: true }
    } else {
      const errorData = await response.json()
      return { success: false, error: errorData.message || "Registration failed" }
    }
  } catch (error) {
    console.error("Error during registration:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    const response = await fetch(`${API_URL}/user/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      const data = await response.json()
      // Set cookie with proper attributes
      cookies().set("jwt_token", data.token.access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      })
      return { success: true }
    } else {
      const errorData = await response.json()
      return { success: false, error: errorData.message || "Login failed" }
    }
  } catch (error) {
    console.error("Error during login:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function logoutUser() {
  // Clear the cookie with the same attributes used when setting it
  cookies().set("jwt_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  })
  revalidatePath("/")
  return { success: true }
}

export async function getUserInfo() {
  try {
    const response = await fetchWithToken(`${API_URL}/user/`)
    if (response.ok) {
      return {
        success: true,
        data: await response.json(),
      }
    } else {
      throw new Error("Failed to fetch user info")
    }
  } catch (error) {
    console.error("Error fetching user info:", error)
    return {
      success: false,
      error: "Failed to fetch user information",
    }
  }
}

export async function registerDonor(formData: FormData) {
  const blood_group = formData.get("blood_group") as string
  const gender = formData.get("gender") as string
  const height = formData.get("height") as string
  const weight = formData.get("weight") as string
  const ailments = formData.get("ailments") as string
  try {
    const response = await fetchWithToken(`${API_URL}/donor/register/`, {
      method: "POST",
      body: JSON.stringify({ blood_group, gender, height, weight, ailments }),
    })

    if (response.ok) {
      revalidatePath("/donors")
      return { success: true }
    } else {
      const errorData = await response.json()
      return { success: false, error: errorData.message || "Donor registration failed" }
    }
  } catch (error) {
    console.error("Error during donor registration:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function getDonor() {
  try {
    const response = await fetchWithToken(`${API_URL}/donor/`)
    if (response.ok) {
      return await response.json()
    } else {
      throw new Error("Failed to fetch donors")
    }
  } catch (error) {
    console.error("Error fetching donors:", error)
    return null
  }
}

export async function getDonations() {
  try {
    const response = await fetchWithToken(`${API_URL}/donor/donations/`)
    if (response.ok) {
      const data = await response.json()
      return data.results
    } else {
      throw new Error("Failed to fetch donations")
    }
  } catch (error) {
    console.error("Error fetching donations:", error)
    return []
  }
}

export async function createDonation(formData: FormData) {
  const donorId = formData.get("donorId") as string
  const date = formData.get("date") as string
  const time = formData.get("time") as string
  const units = formData.get("units") as string
  const location = formData.get("location") as string

  try {
    const response = await fetchWithToken(`${API_URL}/donor/donate/`, {
      method: "POST",
      body: JSON.stringify({ donor_id: donorId, date, time, units, location }),
    })

    if (response.ok) {
      revalidatePath("/donations")
      return { success: true }
    } else {
      const errorData = await response.json()
      return { success: false, error: errorData.message || "Failed to create donation" }
    }
  } catch (error) {
    console.error("Error creating donation:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

