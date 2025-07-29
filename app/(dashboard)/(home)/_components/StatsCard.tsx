import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import React from "react";
import CountUp from "react-countup";

interface Props {
  title: string;
  value: number;
  icon: LucideIcon;
}

function StatsCard(props: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <props.icon size={100} />
      </CardHeader>
      <CardContent>
        <div>
          <CountUp end={100}></CountUp>
        </div>
      </CardContent>
    </Card>
  );
}

export default StatsCard;
