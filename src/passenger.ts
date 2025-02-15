import { toSkill } from "kolmafia";
import { $effects, $item, $location, have } from "libram";

import { CrimboQuest, CrimboStrategy } from "./engine";
import { sober } from "./lib";
import Macro from "./macro";
import { chooseQuestOutfit } from "./outfit";

const location = $location`Crimbo Train (Passenger Car)`;
const passenger: CrimboQuest = {
  name: "Passenger Car",
  location,
  tasks: [
    {
      name: "Crimbo",
      completed: () => false,
      do: location,
      outfit: () => {
        const drunkSpec = sober() ? {} : { offhand: $item`Drunkula's wineglass` };
        return chooseQuestOutfit({ location, isFree: false }, drunkSpec);
      },
      effects: () =>
        $effects`Blood Bubble, Blood Bond, Frenzied\, Bloody, Empathy, Leash of Linguini, Ruthlessly Efficient, Mathematically Precise`.filter(
          (effect) => have(toSkill(effect))
        ),
      combat: new CrimboStrategy(() => Macro.hardCombat()),
      sobriety: "either",
    },
  ],
};

export default passenger;
