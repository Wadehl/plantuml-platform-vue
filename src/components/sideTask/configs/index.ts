export const uml_templates = {
  sequence:
    '@startuml\n' +
    'Alice -> Bob: Authentication Request\n' +
    'alt#Gold #LightBlue Successful case\n' +
    '    Bob -> Alice: Authentication Accepted\n' +
    'else #Pink Failure\n' +
    '    Bob -> Alice: Authentication Rejected\n' +
    'end\n' +
    '@enduml\n',
  use_case:
    '@startuml\n' +
    'left to right direction\n' +
    'skinparam packageStyle rectangle\n' +
    'actor customer\n' +
    'actor clerk\n' +
    'rectangle checkout {\n' +
    '  customer -- (checkout)\n' +
    '  (checkout) .> (payment) : include\n' +
    '  (help) .> (checkout) : extends\n' +
    '  (checkout) -- clerk\n' +
    '}\n' +
    '@enduml\n',
  class:
    '@startuml\n' +
    'class Car\n' +
    '\n' +
    'Driver - Car : drives >\n' +
    'Car *- Wheel : have 4 >\n' +
    'Car -- Person : < owns\n' +
    '\n' +
    '@enduml\n',
  activity:
    '@startuml\n' +
    '\n' +
    'start\n' +
    '\n' +
    'if (multiprocessor?) then (yes)\n' +
    '  fork\n' +
    '    :Treatment 1;\n' +
    '  fork again\n' +
    '    :Treatment 2;\n' +
    '  end fork\n' +
    'else (monoproc)\n' +
    '  :Treatment 1;\n' +
    '  :Treatment 2;\n' +
    'endif\n' +
    '\n' +
    '@enduml\n',
  object:
    '@startuml PERT\n' +
    'left to right direction\n' +
    "' Horizontal lines: -->, <--, <-->\n" +
    "' Vertical lines: ->, <-, <->\n" +
    'title PERT: Project Name\n' +
    '\n' +
    'map Kick.Off {\n' +
    '}\n' +
    'map task.1 {\n' +
    '    Start => End\n' +
    '}\n' +
    'map task.2 {\n' +
    '    Start => End\n' +
    '}\n' +
    'map task.3 {\n' +
    '    Start => End\n' +
    '}\n' +
    'map task.4 {\n' +
    '    Start => End\n' +
    '}\n' +
    'map task.5 {\n' +
    '    Start => End\n' +
    '}\n' +
    'Kick.Off --> task.1 : Label 1\n' +
    'Kick.Off --> task.2 : Label 2\n' +
    'Kick.Off --> task.3 : Label 3\n' +
    'task.1 --> task.4\n' +
    'task.2 --> task.4\n' +
    'task.3 --> task.4\n' +
    'task.4 --> task.5 : Label 4\n' +
    '@enduml\n',
  component:
    '@startuml\n' +
    '\n' +
    'package "Some Group" {\n' +
    '  HTTP - [First Component]\n' +
    '  [Another Component]\n' +
    '}\n' +
    '\n' +
    'node "Other Groups" {\n' +
    '  FTP - [Second Component]\n' +
    '  [First Component] --> FTP\n' +
    '}\n' +
    '\n' +
    'cloud {\n' +
    '  [Example 1]\n' +
    '}\n' +
    '\n' +
    '\n' +
    'database "MySql" {\n' +
    '  folder "This is my folder" {\n' +
    '    [Folder 3]\n' +
    '  }\n' +
    '  frame "Foo" {\n' +
    '    [Frame 4]\n' +
    '  }\n' +
    '}\n' +
    '\n' +
    '\n' +
    '[Another Component] --> [Example 1]\n' +
    '[Example 1] --> [Folder 3]\n' +
    '[Folder 3] --> [Frame 4]\n' +
    '\n' +
    '@enduml\n',
  deployment:
    '@startuml\n' +
    '\n' +
    'node node1\n' +
    'node node2\n' +
    'node node3\n' +
    'node node4\n' +
    'node node5\n' +
    'node1 -- node2 : label1\n' +
    'node1 .. node3 : label2\n' +
    'node1 ~~ node4 : label3\n' +
    'node1 == node5\n' +
    '\n' +
    '@enduml\n',
  state:
    '@startuml\n' +
    '[*] --> Active\n' +
    '\n' +
    'state Active {\n' +
    '  [*] -> NumLockOff\n' +
    '  NumLockOff --> NumLockOn : EvNumLockPressed\n' +
    '  NumLockOn --> NumLockOff : EvNumLockPressed\n' +
    '  --\n' +
    '  [*] -> CapsLockOff\n' +
    '  CapsLockOff --> CapsLockOn : EvCapsLockPressed\n' +
    '  CapsLockOn --> CapsLockOff : EvCapsLockPressed\n' +
    '  --\n' +
    '  [*] -> ScrollLockOff\n' +
    '  ScrollLockOff --> ScrollLockOn : EvScrollLockPressed\n' +
    '  ScrollLockOn --> ScrollLockOff : EvScrollLockPressed\n' +
    '}\n' +
    '\n' +
    '@enduml\n',
  timing:
    '@startuml\n' +
    'clock   "Clock_0"   as C0 with period 50\n' +
    'clock   "Clock_1"   as C1 with period 50 pulse 15 offset 10\n' +
    'binary  "Binary"  as B\n' +
    'concise "Concise" as C\n' +
    'robust  "Robust"  as R\n' +
    'analog  "Analog"  as A\n' +
    '\n' +
    '\n' +
    '@0\n' +
    'C is Idle\n' +
    'R is Idle\n' +
    'A is 0\n' +
    '\n' +
    '@100\n' +
    'B is high\n' +
    'C is Waiting\n' +
    'R is Processing\n' +
    'A is 3\n' +
    '\n' +
    '@300\n' +
    'R is Waiting\n' +
    'A is 1\n' +
    '@enduml\n'
};

export const other_templates = {
  regex:
    '@startregex\n' +
    'title unicodeCategories\n' +
    'letter \\p{L}\\p{Letter} lower \\p{Ll}\\p{Lowercase_letter}\n' +
    '@endregex\n',
  json:
    '@startjson\n' +
    '{\n' +
    '  "firstName": "John",\n' +
    '  "lastName": "Smith",\n' +
    '  "isAlive": true,\n' +
    '  "age": 27,\n' +
    '  "address": {\n' +
    '    "streetAddress": "21 2nd Street",\n' +
    '    "city": "New York",\n' +
    '    "state": "NY",\n' +
    '    "postalCode": "10021-3100"\n' +
    '  },\n' +
    '  "phoneNumbers": [\n' +
    '    {\n' +
    '      "type": "home",\n' +
    '      "number": "212 555-1234"\n' +
    '    },\n' +
    '    {\n' +
    '      "type": "office",\n' +
    '      "number": "646 555-4567"\n' +
    '    }\n' +
    '  ],\n' +
    '  "children": [],\n' +
    '  "spouse": null\n' +
    '}\n' +
    '@endjson\n',
  yaml:
    '@startyaml\n' +
    'doe: "a deer, a female deer"\n' +
    'ray: "a drop of golden sun"\n' +
    'pi: 3.14159\n' +
    'xmas: true\n' +
    'french-hens: 3\n' +
    'calling-birds: \n' +
    '\t- huey\n' +
    '\t- dewey\n' +
    '\t- louie\n' +
    '\t- fred\n' +
    'xmas-fifth-day: \n' +
    '\tcalling-birds: four\n' +
    '\tfrench-hens: 3\n' +
    '\tgolden-rings: 5\n' +
    '\tpartridges: \n' +
    '\t\tcount: 1\n' +
    '\t\tlocation: "a pear tree"\n' +
    '\tturtle-doves: two\n' +
    '@endyaml\n',
  nwdiag:
    '@startuml\n' +
    'nwdiag {\n' +
    '  network dmz {\n' +
    '      address = "210.x.x.x/24"\n' +
    '\n' +
    '      web01 [address = "210.x.x.1"];\n' +
    '      web02 [address = "210.x.x.2"];\n' +
    '  }\n' +
    '  network internal {\n' +
    '      address = "172.x.x.x/24";\n' +
    '\n' +
    '      web01 [address = "172.x.x.1"];\n' +
    '      web02 [address = "172.x.x.2"];\n' +
    '      db01;\n' +
    '      db02;\n' +
    '  }\n' +
    '}\n' +
    '@enduml\n',
  wireframe:
    '@startsalt\n' +
    '{\n' +
    '{T\n' +
    '+Region        | Population    | Age\n' +
    '+ World        | 7.13 billion  | 30\n' +
    '++ America     | 964 million   | 30\n' +
    '+++ Canada     | 35 million    | 30\n' +
    '+++ USA        | 319 million   | 30\n' +
    '++++ NYC       | 8 million     | 30\n' +
    '++++ Boston    | 617 thousand  | 30\n' +
    '+++ Mexico     | 117 million   | 30\n' +
    '++ Europe      | 601 million   | 30\n' +
    '+++ Italy      | 61 million    | 30\n' +
    '+++ Germany    | 82 million    | 30\n' +
    '++++ Berlin    | 3 million     | 30\n' +
    '++ Africa      | 1 billion     | 30\n' +
    '}\n' +
    '}\n' +
    '@endsalt\n',
  archimate:
    '@startuml\n' +
    '!define Junction_Or circle #black\n' +
    '!define Junction_And circle #whitesmoke\n' +
    '\n' +
    'Junction_And JunctionAnd\n' +
    'Junction_Or JunctionOr\n' +
    '\n' +
    'archimate #Technology "VPN Server" as vpnServerA <<technology-device>>\n' +
    '\n' +
    'rectangle GO #lightgreen\n' +
    'rectangle STOP #red\n' +
    'rectangle WAIT #orange\n' +
    'GO -up-> JunctionOr\n' +
    'STOP -up-> JunctionOr\n' +
    'STOP -down-> JunctionAnd\n' +
    'WAIT -down-> JunctionAnd\n' +
    '@enduml\n',
  sdl:
    '@startuml\n' +
    ':Ready;\n' +
    ':next(o)|\n' +
    ':Receiving;\n' +
    'split\n' +
    ':nak(i)<\n' +
    ':ack(o)>\n' +
    'split again\n' +
    ':ack(i)<\n' +
    ':next(o)\n' +
    'on several lines|\n' +
    ':i := i + 1]\n' +
    ':ack(o)>\n' +
    'split again\n' +
    ':err(i)<\n' +
    ':nak(o)>\n' +
    'split again\n' +
    ':foo/\n' +
    'split again\n' +
    ':bar\\\\\n' +
    'split again\n' +
    ':i > 5}\n' +
    'stop\n' +
    'end split\n' +
    ':finish;\n' +
    '@enduml\n',
  ditta:
    '@startditaa\n' +
    '+---------+  /--------\\   +-------+\n' +
    '| cBLU    +--+cAAA    +---+Version|\n' +
    '|         |  |  Data  |   |   V3  |\n' +
    '|    +----+  |  Base  |   |cRED{d}|\n' +
    '|    |cPNK|  |     {s}|   +-------+\n' +
    '|    |    |  \\---+----/\n' +
    '+----+----+    \n' +
    '@endditaa\n',
  mindmap:
    '@startmindmap\n' +
    '+ OS\n' +
    '++ Ubuntu\n' +
    '+++ Linux Mint\n' +
    '+++ Kubuntu\n' +
    '+++ Lubuntu\n' +
    '+++ KDE Neon\n' +
    '++ LMDE\n' +
    '++ SolydXK\n' +
    '++ SteamOS\n' +
    '++ Raspbian\n' +
    '-- Windows 95\n' +
    '-- Windows 98\n' +
    '-- Windows NT\n' +
    '--- Windows 8\n' +
    '--- Windows 10\n' +
    '@endmindmap\n',
  wbs:
    '@startwbs\n' +
    '* Business Process Modelling WBS\n' +
    '** Launch the project\n' +
    '*** Complete Stakeholder Research\n' +
    '*** Initial Implementation Plan\n' +
    '** Design phase\n' +
    '*** Model of AsIs Processes Completed\n' +
    '**** Model of AsIs Processes Completed1\n' +
    '**** Model of AsIs Processes Completed2\n' +
    '*** Measure AsIs performance metrics\n' +
    '*** Identify Quick Wins\n' +
    '** Complete innovate phase\n' +
    '@endwbs\n',
  er:
    '@startuml\n' +
    '\n' +
    'entity "User" {\n' +
    '  + id : int\n' +
    '  --\n' +
    '  + name : string\n' +
    '  + email : string\n' +
    '  + password : string\n' +
    '}\n' +
    '\n' +
    'entity "Order" {\n' +
    '  + id : int\n' +
    '  --\n' +
    '  + user_id : int\n' +
    '  + order_date : datetime\n' +
    '  + total_amount : decimal\n' +
    '}\n' +
    '\n' +
    'entity "Product" {\n' +
    '  + id : int\n' +
    '  --\n' +
    '  + name : string\n' +
    '  + description : text\n' +
    '  + price : decimal\n' +
    '}\n' +
    '\n' +
    'entity "OrderItem" {\n' +
    '  + id : int\n' +
    '  --\n' +
    '  + order_id : int\n' +
    '  + product_id : int\n' +
    '  + quantity : int\n' +
    '  + unit_price : decimal\n' +
    '}\n' +
    '\n' +
    'User ||--o{ Order : places\n' +
    'Order }o--|| OrderItem : contains\n' +
    'Order ||--o{ OrderItem : has\n' +
    'Product ||--o{ OrderItem : included in\n' +
    '\n' +
    '@enduml'
};
