import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, ShieldCheck } from "lucide-react"

export default function PortalPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
        <Link href="/login" className="transition-transform hover:scale-105">
          <Card className="h-full border-2 hover:border-primary/50">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl">Admin Portal</CardTitle>
              <CardDescription>
                System administration, organization management, and global vendor oversight.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              Authorized personnel only. Secure login required.
            </CardContent>
          </Card>
        </Link>

        <Link href="/org/login" className="transition-transform hover:scale-105">
          <Card className="h-full border-2 hover:border-primary/50">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Building2 className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl">Organization Portal</CardTitle>
              <CardDescription>
                Project management, vendor coordination, and internal organizational workflows.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              For registered organizations and their project managers.
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
