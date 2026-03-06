import { Separator } from "@/components/ui/separator";
interface SectionHeaderProps {
    title: string;
    description: string;
}
export function SectionHeader({ title, description }: SectionHeaderProps) {
    return(
<div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground mt-1">
          {description}
        </p>
      </div>

      <Separator />
    </div>
    )
}