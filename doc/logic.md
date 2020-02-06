# Business Logic

Description of objects and logic to get started on design.

## Objects

### Cards

Properties

- color
- type
- cost
- name
- effect

### Player

Properties

- coins
- landmarks
- establishments

### Bank

Properties

- coins
- establishments

### Game

Properties

- players
- dice
- bank

## Logic

### Highest Level

- set up board elements
- set up players
- play
- clean up

### Play

- active player rolls
- go counter clockwise resolve red cards
- all players resolve blue and green cards
- all players resolve purple cards
- active player may buy 1 establishment or landmark
- end if victory
- next clockwise player becomes active and play continues
