import { Card, Tabs } from "@/components/ui";

export default function Demo() {
  return (
    <Card>
    <Tabs
  tabs={[
    { label: "Overview", content: <div>Team info here</div> },
    { label: "Members", content: <div>List of members</div> },
    { label: "Stats", content: <div>Graphs or scores</div> },
  ]}
/>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    

    </Card>
  );
}
