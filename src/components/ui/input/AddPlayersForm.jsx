import MemberInput from "./MemberInput";
import { Button } from "@/components/ui";

export default function AddPlayersForm({
  members,
  setMembers,
  inputRefs,
  showAddButton = true,
  maxMembers = 10,
}) {
  const handleAddMember = () => {
    if (members.length < maxMembers) {
      setMembers([...members, { name: "", gender: "male" }]);
    }
  };

  const handleNameChange = (index, value) => {
    const updated = [...members];
    updated[index] = { ...updated[index], name: value };
    setMembers(updated);
  };

  const handleGenderChange = (index, gender) => {
    const updated = [...members];
    updated[index] = { ...updated[index], gender };
    setMembers(updated);
  };

  return (
    <div className="mb-4">
      {members.map((member, index) => (
        <MemberInput
          key={index}
          member={member}
          index={index}
          onNameChange={handleNameChange}
          onGenderChange={handleGenderChange}
          inputRef={inputRefs}
        />
      ))}

      {showAddButton && members.length < maxMembers && (
        <button
          onClick={handleAddMember}
          className="text-blue-500 hover:underline text-sm mt-2"
        >
          + Lägg till fler
        </button>
      )}
    </div>
  );
}

