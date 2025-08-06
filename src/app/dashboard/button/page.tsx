import { Button } from "@/components/ui/button"
import { ChevronRightIcon, Loader2Icon } from "lucide-react"
// import { IconGitBranch } from "@tabler/icons-react"


export default function Page() {
    return (
        <div className="flex flex-wrap items-center gap-2 md:flex-row">
            <Button>button</Button>
            <Button variant="secondary">secondary</Button>
            <Button variant="destructive">destructive</Button>
            <Button variant="outline">outline</Button>
            <Button variant="ghost">ghost</Button>
            <Button variant="link">link</Button>
            <Button disabled capitalize>disabled</Button>

            <Button variant="secondary" size="icon" className="size-8">
                <ChevronRightIcon />
            </Button>
            {/* <Button variant="outline" size="sm">
                <IconGitBranch /> New Branch
            </Button> */}
            <Button size="sm" disabled>
                <Loader2Icon className="animate-spin" />
                please wait
            </Button>
        </div>
    )
}