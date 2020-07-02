const answers = [
  {
    timestamp: "2020/05/22 1:16:17 PM GMT+2",
    expected_features: "Aliquam hendrerit ante id dolor semper, sed molestie lectus dignissim. Integer sollicitudin erat tempor diam interdum eleifend. Praesent mollis condimentum lorem tempor pharetra. Fusce a neque a est dignissim sollicitudin. Vestibulum sed elementum turpis, at hendrerit mi. Proin malesuada scelerisque purus in dictum.",
    familiarity: 5
  },
  {
    timestamp: "2020/05/22 3:52:44 PM GMT+2",
    expected_features: "Integer sed elit mattis neque porttitor molestie ut quis purus. Duis ultrices ipsum id nisl posuere eleifend. Nam dignissim neque vitae venenatis fermentum. Mauris id nisi rhoncus purus dapibus interdum. Donec venenatis ultrices vehicula. Suspendisse tortor augue, molestie sed nibh id, ornare commodo dolor.",
    familiarity: 3
  },
  {
    timestamp: "2020/05/22 4:35:19 PM GMT+2",
    expected_features: "Cras vehicula viverra faucibus. Praesent sed egestas turpis, quis euismod turpis. Vivamus eu leo vitae sem vehicula gravida vitae luctus orci. Nulla nisl diam, scelerisque a efficitur vel, placerat porttitor dui.",
    familiarity: 2
  },
  {
    timestamp: "2020/05/22 4:42:36 PM GMT+2",
    expected_features: "Vivamus posuere eros justo. Nam dignissim augue nec urna iaculis, ut ullamcorper mi tincidunt. Praesent molestie efficitur vehicula.",
    familiarity: 5
  },
  {
    timestamp: "2020/05/22 5:21:38 PM GMT+2",
    expected_features: "Fusce ac justo ex.",
    familiarity: 5
  },
  {
    timestamp: "2020/05/23 11:21:01 AM GMT+2",
    expected_features: "Proin iaculis nibh sed metus tempus ultricies. Proin viverra sodales volutpat. Quisque fermentum egestas commodo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent ac libero diam. Proin ac bibendum turpis.",
    familiarity: 4
  },
  {
    timestamp: "2020/05/23 10:26:59 PM GMT+2",
    expected_features: "Donec nulla ex, fermentum nec vehicula sed, semper at lacus. Ut nec porta erat, ut venenatis purus.",
    familiarity: 5
  },
  {
    timestamp: "2020/05/25 9:42:46 AM GMT+2",
    expected_features: "Donec dui enim, tempor vel vestibulum sed, tristique sit amet mi. Praesent ac bibendum diam, ac aliquam ligula. Etiam lacinia congue sapien, ut mattis dolor feugiat a. Donec imperdiet justo ornare, congue elit non, hendrerit diam.",
    familiarity: 4
  },
  {
    timestamp: "2020/05/25 1:29:10 PM GMT+2",
    expected_features: "Praesent laoreet vehicula sodales. Vivamus convallis porttitor est, iaculis ornare tellus faucibus sit amet.",
    familiarity: 5
  },
  {
    timestamp: "2020/05/25 3:21:16 PM GMT+2",
    expected_features: "Pellentesque quis velit eu mauris porta facilisis sit amet et tortor. Vivamus in dui vehicula, euismod erat et, iaculis libero. Aliquam neque mi, faucibus id tristique ut, malesuada vel dolor. Mauris dictum lectus quam, eu sagittis turpis maximus et.",
    familiarity: 2
  },
  {
    timestamp: "2020/05/25 3:45:16 PM GMT+2",
    expected_features: "In gravida, justo sit amet facilisis rhoncus, velit ex laoreet urna, nec placerat massa sapien vel ante. Proin malesuada mauris augue, non dapibus sem feugiat eget. Vestibulum nec enim tincidunt, eleifend mauris vitae, placerat arcu.",
    familiarity: 1
  },
  {
    timestamp: "2020/05/25 4:10:26 PM GMT+2",
    expected_features: "Etiam suscipit a sem ac rhoncus. Sed sed dolor congue, rhoncus ante nec, convallis mauris. Proin non quam sit amet odio consectetur dictum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam risus massa, congue et pulvinar sit amet, mattis eget purus. Quisque suscipit augue urna, nec pharetra dui congue at. Aenean sit amet eros hendrerit, laoreet ligula consequat, mattis nibh. ",
    familiarity: 2
  },
  {
    timestamp: "2020/05/25 4:24:10 PM GMT+2",
    expected_features: "Maecenas consectetur velit non tempor lobortis. Sed mollis hendrerit neque sed interdum. Fusce ac elementum neque. Pellentesque at neque at augue imperdiet vestibulum sed et nunc.",
    familiarity: 5
  },
  {
    timestamp: "2020/05/25 5:04:13 PM GMT+2",
    expected_features: "Curabitur lacinia sit amet nisi sed faucibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin volutpat orci tincidunt mi sagittis pharetra.",
    familiarity: 4
  },
  {
    timestamp: "2020/05/25 5:13:18 PM GMT+2",
    expected_features: "Proin non est ullamcorper, tristique erat et, egestas nisl. Proin blandit ex nec iaculis eleifend. Cras bibendum tellus tempus eros molestie tristique. Aliquam maximus sagittis nisl, nec egestas turpis varius non. Praesent dignissim nec ipsum vitae consequat. Vivamus laoreet a erat sed porttitor. Cras aliquam enim non malesuada malesuada. Sed gravida lacus vitae sagittis congue. Sed rutrum dolor in odio euismod mollis.",
    familiarity: 1
  },
  {
    timestamp: "2020/05/26 10:25:03 AM GMT+2",
    expected_features: "Nullam non erat fermentum, placerat diam eget, viverra sem. Praesent nec felis ac neque luctus venenatis. Praesent sed massa posuere leo auctor posuere at non ligula. Pellentesque eu varius risus. Donec sed ante arcu. Sed aliquam nulla in libero tempor scelerisque. Maecenas mi tortor, ornare quis tincidunt a, ullamcorper quis nibh. Nullam quis pellentesque nisl. Sed sed accumsan tortor. Proin tempus tortor et tortor faucibus convallis. In non mattis purus. Maecenas magna mi, tempus eget ante ac, ullamcorper viverra mauris. Vivamus lacus dolor, pretium at dapibus a, egestas mollis tellus. Phasellus id hendrerit lectus, a finibus purus. Maecenas gravida, eros vel fringilla fringilla, sem elit fermentum libero, vitae semper velit turpis at mi.",
    familiarity: 2
  },
  {
    timestamp: "2020/05/26 11:30:51 AM GMT+2",
    expected_features: "Donec ac dui libero. Pellentesque risus orci, scelerisque vel quam a, sagittis mollis justo. Etiam lacinia ultrices nulla non gravida. Nulla fermentum turpis non nibh tempus, vitae iaculis nulla ullamcorper.",
    familiarity: 4},
  {
    timestamp: "2020/05/26 11:32:13 AM GMT+2",
    expected_features: "Proin a ante ac nisi fringilla ornare at sed velit. Cras vel mattis felis, at dictum mauris. Nunc mollis at libero sed tristique.",
    familiarity: 3
  },
  {
    timestamp: "2020/05/27 9:37:53 AM GMT+2",
    expected_features: "Donec quis lorem enim. Nam rutrum interdum neque nec elementum. Sed auctor tellus purus, nec congue elit elementum nec. Phasellus molestie cursus nisl, sed sagittis quam semper nec. Integer lacinia laoreet dui, sit amet accumsan mauris hendrerit at. Curabitur blandit rhoncus libero, id auctor lorem viverra consequat.",
    familiarity: 3
  },
  {
    timestamp: "2020/05/27 11:13:28 AM GMT+2",
    expected_features: "Morbi viverra, dolor quis porta laoreet, augue nisi tincidunt risus, quis tempor massa orci ac nibh.",
    familiarity: 5
  },
  {
    timestamp: "2020/05/27 11:42:15 AM GMT+2",
    expected_features: "Nunc porta ipsum quis velit pretium sodales. Suspendisse potenti.",
    familiarity: 5
  },
  {
    timestamp: "2020/05/27 12:44:29 PM GMT+2",
    expected_features: "Etiam finibus commodo erat, eu porttitor nisi ultricies nec.",
    familiarity: 2
  },
  {
    timestamp: "2020/05/27 12:57:18 PM GMT+2",
    expected_features: "Vivamus euismod ligula tincidunt, vestibulum sem quis, vehicula mi.",
    familiarity: 1
  },
  {
    timestamp: "2020/05/27 2:18:31 PM GMT+2",
    expected_features: "In dapibus ex id lobortis dapibus. Aenean iaculis lacus non sagittis porta. Sed suscipit maximus tempus.",
    familiarity: 5
  },
  {
    timestamp: "2020/05/27 2:38:10 PM GMT+2",
    expected_features: "Fusce quis odio tortor. Mauris sollicitudin dictum purus, non elementum lorem ornare ac. Vestibulum a interdum dolor, id congue tortor. Cras feugiat porta ullamcorper.",
    familiarity: 4
  },
  {
    timestamp: "2020/05/27 2:39:26 PM GMT+2",
    expected_features: "Cras pellentesque molestie dui, quis lobortis dolor venenatis non. Maecenas lobortis lacinia est, at malesuada turpis faucibus non.",
    familiarity: 1
  },
  {
    timestamp: "2020/05/27 2:48:53 PM GMT+2",
    expected_features: "Maecenas fermentum et dolor sit amet finibus. Aenean tortor lectus, luctus eget accumsan nec, eleifend auctor massa.",
    familiarity: 3
  },
  {
    timestamp: "2020/05/27 3:48:56 PM GMT+2",
    expected_features: "Ut blandit nunc eget interdum finibus.",
    familiarity: 3
  },
  {
    timestamp: "2020/05/28 11:01:32 AM GMT+2",
    expected_features: "In euismod condimentum mollis. Aenean ut sem sapien. Praesent facilisis dolor turpis, vitae posuere arcu lobortis ac.",
    familiarity: 2
  },
  {
    timestamp: "2020/05/29 12:39:47 PM GMT+2",
    expected_features: "Fusce eu ex id nunc faucibus convallis commodo at felis.",
    familiarity: 5
  },
  {
    timestamp: "2020/05/29 2:23:34 PM GMT+2",
    expected_features: "Etiam in turpis tempor leo mollis tempus nec in ex.",
    familiarity: 4
  },
  {
    timestamp: "2020/06/02 1:50:18 PM GMT+2",
    expected_features: "Praesent et justo sollicitudin, interdum risus in, vehicula lectus.",
    familiarity: 3
  },
  {
    timestamp: "2020/06/02 1:55:13 PM GMT+2",
    expected_features: "Quisque finibus lacinia justo, ut aliquet leo viverra eget.",
    familiarity: 5
  },
  {
    timestamp: "2020/06/02 1:59:34 PM GMT+2",
    expected_features: "In non leo vitae ante condimentum auctor.",
    familiarity: 3
  },
  {
    timestamp: "2020/06/02 2:08:12 PM GMT+2",
    expected_features: "Donec ante metus, posuere in maximus quis, fermentum eu nisi.",
    familiarity: 4
  },
  {
    timestamp: "2020/06/02 2:21:23 PM GMT+2",
    expected_features: "Nunc id aliquet dui.",
    familiarity: 4
  },
  {
    timestamp: "2020/06/02 2:34:57 PM GMT+2",
    expected_features: "Phasellus et malesuada lacus.",
    familiarity: 5
  },
  {
    timestamp: "2020/06/02 2:35:59 PM GMT+2",
    expected_features: "Fusce blandit tellus in nulla ullamcorper efficitur.",
    familiarity: 3
  },
  {
    timestamp: "2020/06/02 2:57:39 PM GMT+2",
    expected_features: "Donec sagittis lobortis malesuada. In suscipit quam odio, sit amet sagittis odio porta at.",
    familiarity: 1
  },
  {
    timestamp: "2020/06/02 3:21:32 PM GMT+2",
    expected_features: "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    familiarity: 3
  },
  {
    timestamp: "2020/06/02 3:31:46 PM GMT+2",
    expected_features: "Aliquam non mi quis risus fermentum auctor at vel quam.",
    familiarity: 4
  },
  {
    timestamp: "2020/06/03 10:07:33 AM GMT+2",
    expected_features: "Aliquam fermentum porttitor dui, at bibendum justo ullamcorper id.",
    familiarity: 3
  },
  {
    timestamp: "2020/06/03 11:36:07 AM GMT+2",
    expected_features: "Mauris pulvinar, risus quis condimentum eleifend, ipsum felis dapibus justo, quis vulputate felis nunc in nibh.",
    familiarity: 3
  },
  {
    timestamp: "2020/06/03 12:00:42 PM GMT+2",
    expected_features: "Quisque sollicitudin congue sem, sit amet congue arcu eleifend id.",
    familiarity: 3
  }
];