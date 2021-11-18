Hooks.once("dragRuler.ready", (SpeedProvider) => {
    class WangSpeedProvider extends SpeedProvider {
        get colors() {
            return [
                {id: "standard", default: 0x00FF00, name: "wang-speed-provider.speeds.standard"},
                {id: "run", default: 0xFFFF00, name: "wang-speed-provider.speeds.run"},
                {id: "sprint", default: 0xFF8000, name: "wang-speed-provider.speeds.sprint"}
            ]
        }

        getRanges(token) {
            const combatData = token.actor.data.data.combat;
            
            const baseSpeed = (combatData.is_prone) ? combatData.speed/2 : combatData.speed;

			// A character can always walk it's base speed and dash twice it's base speed
			const ranges = [
				{range: baseSpeed, color: "standard"},
				{range: baseSpeed * 2, color: "run"},
                {range: baseSpeed * 3, color: "sprint"}
			];

			// Characters that aren't wearing armor are allowed to run with three times their speed
			// if (!token.actor.data.isWearingArmor) {
			// 	ranges.push({range: baseSpeed * 3, color: "dash"})
			// }

            return ranges;
        }
    }

    dragRuler.registerModule("wang-speed-provider", WangSpeedProvider)
})