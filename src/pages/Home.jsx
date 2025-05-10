import { TabCard, Tab } from "@/components/ui";

export default function Demo() {
  return (
    <TabCard>
      <Tab label="Overview">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt...
        </p>
      </Tab>
      <Tab label="Members" disabled>
        <p>List of members</p>
      </Tab>
    </TabCard>

  );
}
