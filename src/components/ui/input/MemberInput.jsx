import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { Switch, TextInput } from "@/components/ui";

export default function MemberInput({ member, index, onNameChange, onGenderChange, inputRef }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <TextInput
        ref={inputRef}
        value={member.name}
        onChange={(e) => onNameChange(index, e.target.value)}
        maxLength={10}
        placeholder={`Spelare ${index + 1}`}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            const next = inputRef.current[index + 1];
            if (next) next.focus();
            else document.activeElement.blur();
          }
        }}
      />
      <Switch
        onChange={(isChecked) => onGenderChange(index, isChecked ? "female" : "male")}
      >
        <FontAwesomeIcon icon={faMars} />
        <FontAwesomeIcon icon={faVenus} />
      </Switch>
    </div>
  );
}

