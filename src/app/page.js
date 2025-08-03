import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-full max-container">
      <RepoLinkCard />
    </div>
  );
}

function RepoLinkCard() {
  return (
    <Card className="max-w-lg">
      <CardHeader>
        <div className="flex gap-2 justify-center">
          <Avatar>
            <AvatarImage src="https://github.com/react.png" />
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/nextjs-bot.png" />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn-ui.png" />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/tailwindlabs.png" />
            <AvatarFallback>T</AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Formx</h2>
          <p className="text-lg text-muted-foreground">
            A modern template for building reusable next.js form components.
          </p>
          <a
            className="text-muted-foreground text-xs underline"
            href="https://github.com/afzal6174/formx"
          >
            Source Code Repository
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
