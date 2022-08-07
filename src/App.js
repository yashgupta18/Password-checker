import "./styles.css";
import { useState, useEffect } from "react";
import {
  hasNumber,
  hasUpperCase,
  hasLowerCase,
  hasSpecialCharacter
} from "./utils";
export default function App() {
  const [value, setValue] = useState("");
  const [strength, setStrength] = useState(0);
  const [progressStyles, setProgressStyles] = useState({
    width: "0%",
    backgroundColor: "transparent"
  });
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const updatedPrograssBarStyles = {
      backgroundColor: "red"
    };
    let totalStrength = 0;
    if (value.length > 3) {
      const strengthByLength = Math.min(6, Math.floor(value.length / 3));
      let strengthByCharacterType = 0;
      if (hasNumber.test(value)) {
        strengthByCharacterType += 1;
      }

      if (hasUpperCase.test(value)) {
        strengthByCharacterType += 1;
      }
      if (hasLowerCase.test(value)) {
        strengthByCharacterType += 1;
      }
      if (hasSpecialCharacter.test(value)) {
        strengthByCharacterType += 1;
      }
      totalStrength = strengthByLength + strengthByCharacterType;
    } else {
      totalStrength = 0;
    }

    updatedPrograssBarStyles.width = `${totalStrength * 10}%`;
    if (totalStrength > 8) {
      updatedPrograssBarStyles.backgroundColor = "green";
    } else if (totalStrength > 6) {
      updatedPrograssBarStyles.backgroundColor = "orange";
    }
    setStrength(totalStrength);
    setProgressStyles(updatedPrograssBarStyles);
  }, [value]);

  return (
    <div className="App">
      <input type="text" value={value} onChange={handleChange} />
      <div className="progress-container">
        <div className="progress-bar" style={{ ...progressStyles }} />
      </div>
      <p>strength password is {strength}</p>
    </div>
  );
}
