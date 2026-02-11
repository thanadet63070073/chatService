'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useState } from "react"
import { useRouter } from 'next/navigation';

import { loginApi } from "@/services/authService"

import { useAuth } from "@/context/AuthContext"

export function LoginCard() {
  const router = useRouter();
  const authContext = useAuth();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleLoginButton = async () => {
    setIsLoading(true)

    try {
      const response = await loginApi(email, password)

      const data = await response.json()

      if (response.ok) {
        authContext.login(data.token);
        setStatusMessage("")
        router.push('/chatRooms')
      } else {
        console.error("Login Failed:", data.message)
        setIsError(true)
        setStatusMessage(data.message)
      }
    } catch (error) {
      console.error("Error:", error)
      setStatusMessage("Login Failed")
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const goToRegister = () => {
    router.push('/register')
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle>Login to your account</CardTitle>
      </CardHeader>
      <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {
              statusMessage !== "" &&
              <div className="pt-4 flex justify-center align-middle">
                <div className={`w-full py-2 text-center ${isError ? "bg-red-200 text-red-500" : "bg-green-200 text-green-500"}`}>
                  {statusMessage}
                </div>
              </div>
            }
          </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button disabled={isLoading} onClick={handleLoginButton} className="w-full">
          Login
        </Button>
        <Button onClick={goToRegister} variant="outline" className="w-full">
          Sign Up
        </Button>
      </CardFooter>
    </Card>
  )
}
