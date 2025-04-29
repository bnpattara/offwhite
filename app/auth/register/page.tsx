import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-black" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <div className="mr-2 h-6 w-6 border border-white" />
          "OFF-WHITE MENTORSHIP"
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "DESIGN IS THE FRESHEST SCAM. DESIGN IS THE NEWEST FORM OF ART. DESIGN IS WHAT YOU DO WHEN YOU DON'T HAVE
              AN IDEA."
            </p>
            <footer className="text-sm">Virgil Abloh</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">"CREATE AN ACCOUNT"</h1>
            <p className="text-sm text-muted-foreground">Join the OFF-WHITE mentorship community</p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
