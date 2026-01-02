import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Briefcase, Users, Clock, CheckCircle2, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OrgDashboard() {
  const stats = [
    { title: "Active Projects", value: "12", icon: Briefcase, color: "text-blue-600" },
    { title: "Engaged Vendors", value: "34", icon: Users, color: "text-green-600" },
    { title: "Pending Approvals", value: "5", icon: Clock, color: "text-amber-600" },
    { title: "Completed Tasks", value: "128", icon: CheckCircle2, color: "text-indigo-600" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Organization Dashboard</h1>
          <p className="text-muted-foreground">Manage your projects and coordinate with vendors.</p>
        </div>
        <Button>New Project</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Active Projects</CardTitle>
              <CardDescription>Recently updated projects in your organization.</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between py-4">
                  <div className="space-y-1">
                    <p className="font-medium">Infrastructure Upgrade {i}</p>
                    <p className="text-sm text-muted-foreground">Lead Vendor: TechBuild Solutions • Due in 14 days</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium">65%</p>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[65%]" />
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vendor Activity</CardTitle>
            <CardDescription>Recent updates from your vendors.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-primary shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Vendor X</span> submitted a new invoice for project Alpha.
                    </p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
