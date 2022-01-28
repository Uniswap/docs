---
id: nifty-smashers
title: Nifty Smashers
sidebar_position: 2
---

  <div>
  <video width="100%" height="100%" playsInline controls loop>
  <source src="https://www.youtube.com/watch?v=WWLqE1tnf6U&feature=youtu.be" />
  Your browser does not support the video tag.
  </video>
  </div>

---

# **General Info**

Get ready to brawl! The local-multiplayer version of **[Nifty Smashers](https://nifty-league.com/games)** was made available immediately at launch followed by the online multiplayer.

Battle it out amongst the community and get in as many bat bonks on your friends as you can! Nifty Smashers takes inspiration from the classic Super Smash Bros game where the objective is to knock your opponents off the map to score points.

You can play using your keyboard or any other compatible controller (Playstation, Xbox, etc.). Enter the game lobby and select your DEGEN for battle.

## Scoring

- If a DEGEN is hit once and dies (fall off map) you get 1 point.
- If a DEGEN is hit multiple times without being able to recover, you get points as often as the DEGEN is hit (regardless of if previous hits were done by another DEGEN - so land the final mega-bonk to hit them off the map and claim all the points for the round).
- The more your opponent is successively bonked, the faster they bounce around and the more points you'll score for bonking.
- The last hit that kills the DEGEN, gets all combo points.
- Currently there is no cap of how often a DEGEN can be hit (combo’ed), but there is a cap on the number of points you can get (max 3pts: 2-player match / max 5pts: 3&4-player match).
- A 2-player match require 5pts to win a round.
- 3 & 4-player matches require 10pts to win a round.
- Matches are best of 5 rounds.
- If there is a tie after the 5th round, the tied players move into a sudden death round that the other players get to watch from the sideline.

## Lag

- The lag indicator shows the lag (ping speed) of your connection.
- Lag tyipcally indicates your ping speed is above 100ms.
- Generally speaking, lag is always present whenever there is physical distance between the players on the internet. The greater the distance, the greater the lag.
- There are different techniques that developers use to compensate and hide the lag.
- We have implemented a number of these lag compensation techniques that veil the lag for the best experience possible.
- We have also incorporated solutions with servers all around the world so that we can match players closest to each other to minimize the lag as much as possible. If you are interested in learning more about these techniques, check out [this post](https://www.gabrielgambetta.com/client-side-prediction-server-reconciliation.html) we love on Lag Compensation by Gabriel Gambetta.

## Custom Lobby

- A custom lobby can be used to open a match in a chosen region. The creator of the lobby can see a code in the lobby map which can be shared with others.
- If another degen wants to join the lobby, he first needs to select the correct region and then type the lobby code into the input box.
- When using a custom lobby code, the region should be switched automatically.

## Changing Regions

- Smasher is a fast paced game where latency/ping is crucial. The closer the chosen region is to the player’s location, the lower the ping.
- After changing the region in the Web-GL or Desktop App, the current ping is displayed.

# **Battle Basics**

## General advice

- Playing with a controller highly recommended (Playstation, Xbox, or any other controller recognized by your PC/Mac).

## Bat swings

- The bat can be swung in all possible direction: left, right, up, down, diagonals.
- The bat can be swung by clicking the attack button.
- Longer button presses makes the bat hit harder.
- The bat can be swung while standing, running, or jumping.
- Players may long press the attack button during jumps - this is usually a good way to surprise your opponent(s).

## Moving

- As a 2D Game, moving directions are left/right.
- Directions can be changed during jumps/tumble (this is much easier to accomplish using a controller).

## Jumping

- Jump height can be altered by press-duration of jump button.
- Directions can be changed during jumps/tumble.

## Flying Hamburger

- Catching the flying hamburger will make your DEGEN's bat hit much stronger - this typically results in a direct kill.
- We are considering limiting burger buff duration by time and/or kill.

# **Tribe Specifics**

_All DEGEN tribes have a Special Ability (”SA”), which will be consistent across all Nifty League games (live and future)._

## List of Special Abilities

- **Ape** - Throw boomerang bananas
- **Alien** - Teleport
- **Cat** - Pounce and get bat power and speed boost temporarily
- **Frog** - The tongue grapple hook
- **Doge** - Doge coin roll
- **Human** - Throw dynamites that explode on command

## Alien

- Pressing the SA button makes Alien can teleport a short distance in the aimed direction (left, right, up, down, diagonals).
- There is a energy explosion at the teleported location, hitting opponents that stand near.

## Ape

- Pressing the SA button throws a banana in the aimed direction (left, right, up, down, diagonals) until it hits an opponent, hits a map part, or flies off the map.
- Pressing the SA button again makes the banana fly back to the DEGEN, making it possible to hit an opponent again.
- Bananas can be hit with a bat and fly in the aimed direction.

## Cat

- Pressing the SA makes the cat pounce. After pouncing for a short duration, the cat ges empowered.
- Empowered bat swing means the bat hits harder.
- Empowered movement means the cat runs faster.
- Cats can double jump and jump in mid-air.

## Doge

- Pressing and holding the SA button makes the doge roll.
- Hitting an opponent with doge roll makes them fly upwards in roll direction.
- Doge will fly-roll in the aimed direction.
- During doge roll, directions can be changed three times until doge roll ends.
- Doge roll also ends after a certain time.

## Frog

- Pressing the SA button makes the Frog shoot his tongue.
- When the tongue hits an opponent, that opponent is pulled to the frogs direction and flies a bit further.
- When the tongue hits a map piece, the frogs pulls himself to that object (e.g. walls, ceilings, etc.)
- The tongue can be shot in the aimed direction (left, right, up, down, diagonals).

### Human

- Pressing the SA button throws a bomb in the aimed direction (left, right, up, down, diagonals).
- The bomb has a flying curve and doesn't fly straight like bananas (if not detonated, it stays on the ground).
- The bomb explodes after some time or after the SA button is pressed a second time.
- Currently the bomb can hit an opponent by hitting it or via explosion.
- Bombs are the only SA that can hit the throwing DEGEN itself with its explosion.
- Bombs can be hit with a bat and fly in the aimed direction.
- We plan to update the game so the bomb detonates immediately after contact with an opponent. If no opponent is hit, it stays on the ground until it explodes automatically or after pressing SA button second time.

Please join our **[Discord](https://discord.gg/niftyleague)** to provide feedback and ideas on how we can improve the game and take it to the next level.
