import { useState, useMemo } from "react";

// ===== SIMULATOR 2026 — la momentul fișei (poziție cunoscută) =====
// Bază reală 2025 (aiparte.ro/SIIIR): m=prag medie, pos=ultima poziție la admitere.
const DATA = [{"n":"Gheorghe Lazăr","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.82,"pos":345,"pm":10.0,"l":84,"l5":78,"sec":"S5","r":1,"star":false},{"n":"Sfântul Sava","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":9.82,"pos":362,"pm":10.0,"l":28,"l5":26,"sec":"S1","r":2,"star":false},{"n":"Gheorghe Lazăr","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":9.8,"pos":455,"pm":10.0,"l":84,"l5":78,"sec":"S5","r":1,"star":false},{"n":"Spiru Haret","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.75,"pos":681,"pm":9.95,"l":56,"l5":52,"sec":"S2","r":3,"star":false},{"n":"Spiru Haret","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":9.72,"pos":748,"pm":9.97,"l":56,"l5":52,"sec":"S2","r":3,"star":false},{"n":"Sfântul Sava","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.72,"pos":800,"pm":10.0,"l":140,"l5":130,"sec":"S1","r":2,"star":false},{"n":"Tudor Vianu","t":"Colegiul Național de Informatică","p":"Real","s":"Matematică-Informatică","b":"Limba germană(fără examen)","m":9.67,"pos":957,"pm":10.0,"l":28,"l5":26,"sec":"S1","r":4,"star":false},{"n":"Gheorghe Lazăr","t":"Colegiul Național","p":"Umanist","s":"Științe Sociale","b":null,"m":9.65,"pos":1091,"pm":10.0,"l":56,"l5":52,"sec":"S5","r":1,"star":false},{"n":"Tudor Vianu","t":"Colegiul Național de Informatică","p":"Real","s":"Matematică-Informatică","b":null,"m":9.62,"pos":1244,"pm":10.0,"l":224,"l5":208,"sec":"S1","r":4,"star":false},{"n":"Tudor Vianu","t":"Colegiul Național de Informatică","p":"Real","s":"Științe ale Naturii","b":null,"m":9.62,"pos":1245,"pm":null,"l":28,"l5":null,"sec":"S1","r":4,"star":false},{"n":"Gheorghe Lazăr","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":9.62,"pos":1277,"pm":9.95,"l":28,"l5":26,"sec":"S5","r":1,"star":false},{"n":"Sfântul Sava","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":9.6,"pos":1398,"pm":10.0,"l":28,"l5":26,"sec":"S1","r":2,"star":false},{"n":"Grigore Moisil","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":9.6,"pos":1440,"pm":9.9,"l":28,"l5":26,"sec":"S6","r":5,"star":false},{"n":"I.L.Caragiale","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":"Limba germană(fără examen)","m":9.6,"pos":1462,"pm":9.8,"l":14,"l5":13,"sec":"S1","r":6,"star":false},{"n":"Spiru Haret","t":"Colegiul Național","p":"Umanist","s":"Științe Sociale","b":null,"m":9.57,"pos":1533,"pm":9.85,"l":56,"l5":52,"sec":"S2","r":3,"star":false},{"n":"Matei Basarab","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":9.55,"pos":1630,"pm":9.9,"l":56,"l5":52,"sec":"S3","r":8,"star":false},{"n":"Matei Basarab","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.55,"pos":1658,"pm":9.9,"l":112,"l5":104,"sec":"S3","r":8,"star":false},{"n":"I.L.Caragiale","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":9.55,"pos":1707,"pm":9.8,"l":28,"l5":26,"sec":"S1","r":6,"star":false},{"n":"Spiru Haret","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":9.52,"pos":1725,"pm":9.9,"l":28,"l5":26,"sec":"S2","r":3,"star":false},{"n":"Grigore Moisil","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.52,"pos":1816,"pm":9.97,"l":84,"l5":78,"sec":"S6","r":5,"star":false},{"n":"Gheorghe Șincai","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":9.52,"pos":1849,"pm":9.82,"l":56,"l5":52,"sec":"S4","r":9,"star":false},{"n":"Mihai Viteazul","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":9.5,"pos":1877,"pm":10.0,"l":56,"l5":52,"sec":"S2","r":10,"star":false},{"n":"Matei Basarab","t":"Colegiul Național","p":"Umanist","s":"Științe Sociale","b":null,"m":9.47,"pos":2018,"pm":9.75,"l":84,"l5":26,"sec":"S3","r":8,"star":false},{"n":"I.L.Caragiale","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.47,"pos":2043,"pm":9.77,"l":84,"l5":78,"sec":"S1","r":6,"star":false},{"n":"Gheorghe Șincai","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.47,"pos":2090,"pm":9.95,"l":140,"l5":130,"sec":"S4","r":9,"star":false},{"n":"Iulia Hașdeu","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":9.45,"pos":2254,"pm":9.82,"l":28,"l5":26,"sec":"S2","r":11,"star":false},{"n":"I.L.Caragiale","t":"Colegiul Național","p":"Umanist","s":"Științe Sociale","b":null,"m":9.42,"pos":2354,"pm":9.6,"l":28,"l5":26,"sec":"S1","r":6,"star":false},{"n":"Matei Basarab","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":9.42,"pos":2368,"pm":9.7,"l":28,"l5":26,"sec":"S3","r":8,"star":false},{"n":"Mihai Viteazul","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.4,"pos":2591,"pm":9.9,"l":224,"l5":208,"sec":"S2","r":10,"star":false},{"n":"Cantemir Vodă","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":9.37,"pos":2684,"pm":9.67,"l":56,"l5":52,"sec":"S2","r":12,"star":false},{"n":"Ion Creangă","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.37,"pos":2702,"pm":9.67,"l":56,"l5":52,"sec":"S4","r":13,"star":false},{"n":"Ion Creangă","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":9.35,"pos":2848,"pm":9.77,"l":56,"l5":52,"sec":"S4","r":13,"star":false},{"n":"Grigore Moisil","t":"Colegiul Național","p":"Umanist","s":"Științe Sociale","b":null,"m":9.35,"pos":2875,"pm":9.67,"l":28,"l5":26,"sec":"S6","r":5,"star":false},{"n":"Iulia Hașdeu","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.35,"pos":2876,"pm":9.8,"l":56,"l5":52,"sec":"S2","r":11,"star":false},{"n":"Cantemir Vodă","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.35,"pos":2885,"pm":9.65,"l":112,"l5":104,"sec":"S2","r":12,"star":false},{"n":"Gheorghe Șincai","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":9.35,"pos":2927,"pm":9.7,"l":56,"l5":52,"sec":"S4","r":9,"star":false},{"n":"Elena Cuza","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.32,"pos":2962,"pm":9.72,"l":56,"l5":52,"sec":"S6","r":14,"star":false},{"n":"Nicolae Iorga","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":9.3,"pos":3188,"pm":9.65,"l":56,"l5":52,"sec":"S1","r":15,"star":false},{"n":"I.L.Caragiale","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":9.3,"pos":3236,"pm":9.75,"l":28,"l5":26,"sec":"S1","r":6,"star":false},{"n":"Ion Creangă","t":"Colegiul Național","p":"Umanist","s":"Științe Sociale","b":null,"m":9.27,"pos":3255,"pm":9.5,"l":28,"l5":26,"sec":"S4","r":13,"star":false},{"n":"Mihai Eminescu","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":9.27,"pos":3403,"pm":9.75,"l":56,"l5":52,"sec":"S4","r":16,"star":false},{"n":"Nicolae Iorga","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":null,"m":9.27,"pos":3406,"pm":9.55,"l":28,"l5":26,"sec":"S1","r":15,"star":false},{"n":"I.L.Caragiale","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":"Limba germană(fără examen)","m":9.27,"pos":3410,"pm":9.48,"l":14,"l5":13,"sec":"S1","r":6,"star":false},{"n":"Grigore Moisil","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":9.25,"pos":3418,"pm":9.62,"l":28,"l5":26,"sec":"S6","r":5,"star":false},{"n":"Alexandru Ioan Cuza","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":null,"m":9.25,"pos":3430,"pm":9.57,"l":28,"l5":52,"sec":"S3","r":17,"star":false},{"n":"Mihai Eminescu","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.25,"pos":3476,"pm":9.82,"l":112,"l5":104,"sec":"S4","r":16,"star":false},{"n":"Ion Neculce","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":9.25,"pos":3492,"pm":9.9,"l":28,"l5":26,"sec":"S1","r":18,"star":true},{"n":"Alexandru Ioan Cuza","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":9.22,"pos":3685,"pm":9.87,"l":112,"l5":130,"sec":"S3","r":17,"star":false},{"n":"Iulia Hașdeu","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":9.22,"pos":3702,"pm":9.62,"l":56,"l5":52,"sec":"S2","r":11,"star":false},{"n":"Ion Neculce","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.22,"pos":3723,"pm":9.55,"l":84,"l5":78,"sec":"S1","r":18,"star":true},{"n":"Ion Creangă","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":9.2,"pos":3867,"pm":9.87,"l":56,"l5":52,"sec":"S4","r":13,"star":false},{"n":"Școala Centrală","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.2,"pos":3875,"pm":9.5,"l":112,"l5":104,"sec":"S2","r":19,"star":false},{"n":"Mihai Eminescu","t":"Colegiul Național","p":"Umanist","s":"Științe Sociale","b":null,"m":9.17,"pos":3913,"pm":9.4,"l":28,"l5":52,"sec":"S4","r":16,"star":false},{"n":"Ion Neculce","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":"Limba italiană(fără examen)","m":9.17,"pos":3915,"pm":9.67,"l":28,"l5":26,"sec":"S1","r":18,"star":true},{"n":"Nicolae Iorga","t":"Liceul Teoretic","p":"Umanist","s":"Științe Sociale","b":null,"m":9.17,"pos":4007,"pm":9.3,"l":28,"l5":26,"sec":"S1","r":15,"star":false},{"n":"Școala Centrală","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":"Limba franceză(fără examan)","m":9.15,"pos":4090,"pm":9.32,"l":28,"l5":26,"sec":"S2","r":19,"star":false},{"n":"Miguel de Cervantes","t":"Liceul Teoretic Bilingv","p":"Real","s":"Matematică-Informatică","b":null,"m":9.15,"pos":4148,"pm":9.52,"l":28,"l5":26,"sec":"S1","r":20,"star":false},{"n":"Jean Monnet","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":9.15,"pos":4155,"pm":9.65,"l":56,"l5":52,"sec":"S1","r":21,"star":false},{"n":"Mihai Eminescu","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":9.15,"pos":4180,"pm":9.4,"l":28,"l5":52,"sec":"S4","r":16,"star":false},{"n":"Ion Neculce","t":"Colegiul Național","p":"Umanist","s":"Științe Sociale","b":null,"m":9.12,"pos":4226,"pm":9.5,"l":28,"l5":26,"sec":"S1","r":18,"star":true},{"n":"Alexandru Ioan Cuza","t":"Liceul Teoretic","p":"Umanist","s":"Științe Sociale","b":null,"m":9.12,"pos":4247,"pm":9.62,"l":56,"l5":52,"sec":"S3","r":17,"star":false},{"n":"Nicolae Iorga","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":9.12,"pos":4328,"pm":9.3,"l":28,"l5":26,"sec":"S1","r":15,"star":false},{"n":"Jean Monnet","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":null,"m":9.1,"pos":4446,"pm":9.67,"l":28,"l5":52,"sec":"S1","r":21,"star":false},{"n":"Ion Barbu","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":9.1,"pos":4491,"pm":9.45,"l":56,"l5":52,"sec":"S5","r":22,"star":false},{"n":"Ion Neculce","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":9.1,"pos":4493,"pm":9.47,"l":28,"l5":26,"sec":"S1","r":18,"star":true},{"n":"Goethe","t":"Colegiul German","p":"Real","s":"Teor.real spec.germană","b":null,"m":9.08,"pos":4518,"pm":9.86,"l":28,"l5":25,"sec":"S1","r":23,"star":false},{"n":"Elena Cuza","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":9.07,"pos":4605,"pm":9.42,"l":28,"l5":26,"sec":"S6","r":14,"star":false},{"n":"Ion Neculce","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":"Limba italiană(fără examen)","m":9.05,"pos":4685,"pm":9.6,"l":28,"l5":26,"sec":"S1","r":18,"star":true},{"n":"Ion Barbu","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":null,"m":9.05,"pos":4785,"pm":9.27,"l":56,"l5":52,"sec":"S5","r":22,"star":false},{"n":"Școala Centrală","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":9.02,"pos":4832,"pm":9.3,"l":84,"l5":78,"sec":"S2","r":19,"star":false},{"n":"Tudor Vladimirescu","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":9.02,"pos":4857,"pm":9.72,"l":56,"l5":52,"sec":"S6","r":24,"star":false},{"n":"C.A. Rosetti","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":9.02,"pos":4877,"pm":9.42,"l":84,"l5":78,"sec":"S2","r":25,"star":false},{"n":"Jean Monnet","t":"Liceul Teoretic","p":"Umanist","s":"Științe Sociale","b":null,"m":9.02,"pos":4942,"pm":9.4,"l":56,"l5":52,"sec":"S1","r":21,"star":false},{"n":"Miguel de Cervantes","t":"Liceul Teoretic Bilingv","p":"Umanist","s":"Filologie","b":null,"m":9.0,"pos":4971,"pm":9.47,"l":28,"l5":26,"sec":"S1","r":20,"star":false},{"n":"George Călinescu","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":9.0,"pos":5023,"pm":9.2,"l":84,"l5":78,"sec":"S1","r":26,"star":false},{"n":"Școala Centrală","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":"Limba franceză(fără examan)","m":9.0,"pos":5055,"pm":9.5,"l":28,"l5":26,"sec":"S2","r":19,"star":false},{"n":"Dante Alighieri","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":null,"m":8.97,"pos":5114,"pm":9.17,"l":28,"l5":26,"sec":"S3","r":27,"star":false},{"n":"C.A. Rosetti","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":null,"m":8.97,"pos":5133,"pm":9.4,"l":84,"l5":78,"sec":"S2","r":25,"star":false},{"n":"Dante Alighieri","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":8.97,"pos":5172,"pm":9.72,"l":56,"l5":52,"sec":"S3","r":27,"star":false},{"n":"V. Madgearu","t":"Colegiul Economic","p":"Servicii","s":"Turism și alimentație","b":null,"m":8.97,"pos":5200,"pm":9.52,"l":28,"l5":24,"sec":"S1","r":28,"star":false},{"n":"C.A. Rosetti","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.97,"pos":5204,"pm":9.27,"l":28,"l5":26,"sec":"S2","r":25,"star":false},{"n":"Tudor Vladimirescu","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":null,"m":8.95,"pos":5347,"pm":9.4,"l":56,"l5":52,"sec":"S6","r":24,"star":false},{"n":"Emil Racoviță","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":8.95,"pos":5356,"pm":9.15,"l":28,"l5":26,"sec":"S2","r":29,"star":false},{"n":"Ion Barbu","t":"Liceul Teoretic","p":"Umanist","s":"Științe Sociale","b":null,"m":8.92,"pos":5495,"pm":9.37,"l":56,"l5":78,"sec":"S5","r":22,"star":false},{"n":"Goethe","t":"Colegiul German","p":"Umanist","s":"Teor.uman.spec.germană","b":null,"m":8.9,"pos":5589,"pm":9.68,"l":28,"l5":25,"sec":"S1","r":23,"star":false},{"n":"Tudor Vladimirescu","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.87,"pos":5707,"pm":9.3,"l":28,"l5":26,"sec":"S6","r":24,"star":false},{"n":"George Călinescu","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.87,"pos":5729,"pm":9.07,"l":84,"l5":78,"sec":"S1","r":26,"star":false},{"n":"Dante Alighieri","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.87,"pos":5755,"pm":9.12,"l":28,"l5":26,"sec":"S3","r":27,"star":false},{"n":"Victor Babeș","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":8.85,"pos":5805,"pm":9.1,"l":28,"l5":26,"sec":"S2","r":30,"star":false},{"n":"Ștefan Odobleja","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":null,"m":8.82,"pos":5939,"pm":9.22,"l":28,"l5":26,"sec":"S5","r":31,"star":false},{"n":"Alexandru Vlahuță","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.8,"pos":6071,"pm":9.05,"l":56,"l5":52,"sec":"S1","r":32,"star":false},{"n":"Tudor Vladimirescu","t":"Liceul Teoretic","p":"Umanist","s":"Științe Sociale","b":null,"m":8.8,"pos":6076,"pm":9.4,"l":56,"l5":78,"sec":"S6","r":24,"star":false},{"n":"V. Madgearu","t":"Colegiul Economic","p":"Servicii","s":"Economic","b":null,"m":8.8,"pos":6095,"pm":9.65,"l":252,"l5":216,"sec":"S1","r":28,"star":false},{"n":"Nicolae Kretzulescu","t":"Școala Superioară Comercială","p":"Servicii","s":"Comerț","b":null,"m":8.77,"pos":6189,"pm":9.25,"l":28,"l5":24,"sec":"S3","r":33,"star":false},{"n":"Alexandru Vlahuță","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":"Limba germană(fără examen)","m":8.77,"pos":6220,"pm":9.2,"l":14,"l5":13,"sec":"S1","r":32,"star":false},{"n":"Ștefan Demetrescu","t":"Liceul Teologic Adventist","p":"Real","s":"Matematică-Informatică","b":null,"m":8.75,"pos":6269,"pm":9.57,"l":28,"l5":26,"sec":"S4","r":34,"star":false},{"n":"Nicolae Kretzulescu","t":"Școala Superioară Comercială","p":"Servicii","s":"Economic","b":null,"m":8.75,"pos":6365,"pm":9.4,"l":168,"l5":120,"sec":"S3","r":33,"star":false},{"n":"C-tin Brâncoveanu","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":8.72,"pos":6421,"pm":9.2,"l":56,"l5":52,"sec":"S1","r":35,"star":false},{"n":"Nicolae Kretzulescu","t":"Școala Superioară Comercială","p":"Servicii","s":"Turism și alimentație","b":null,"m":8.72,"pos":6452,"pm":9.37,"l":28,"l5":48,"sec":"S3","r":33,"star":false},{"n":"Aurel Vlaicu","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":8.7,"pos":6541,"pm":9.17,"l":56,"l5":52,"sec":"S1","r":36,"star":false},{"n":"Emil Racoviță","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":8.7,"pos":6621,"pm":9.17,"l":28,"l5":78,"sec":"S2","r":29,"star":false},{"n":"Ștefan Odobleja","t":"Liceul Teoretic","p":"Umanist","s":"Științe Sociale","b":null,"m":8.67,"pos":6644,"pm":8.9,"l":28,"l5":26,"sec":"S5","r":31,"star":false},{"n":"Eugen Lovinescu","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":8.67,"pos":6680,"pm":9.15,"l":84,"l5":78,"sec":"S6","r":37,"star":false},{"n":"Ștefan Odobleja","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":8.65,"pos":6787,"pm":9.4,"l":84,"l5":78,"sec":"S5","r":31,"star":false},{"n":"Octav Onicescu","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":8.65,"pos":6813,"pm":9.32,"l":112,"l5":104,"sec":"S4","r":38,"star":false},{"n":"Aurel Vlaicu","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":8.62,"pos":6875,"pm":9.12,"l":56,"l5":52,"sec":"S1","r":36,"star":false},{"n":"Ștefan Odobleja","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.62,"pos":6881,"pm":9.22,"l":28,"l5":26,"sec":"S5","r":31,"star":false},{"n":"Marin Preda","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":8.62,"pos":6945,"pm":9.37,"l":28,"l5":26,"sec":"S6","r":39,"star":false},{"n":"C-tin Brâncoveanu","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":null,"m":8.6,"pos":7018,"pm":9.7,"l":56,"l5":52,"sec":"S1","r":35,"star":false},{"n":"Sfântul Iosif","t":"Colegiul Romano-Catolic","p":"Real","s":"Științe ale Naturii","b":null,"m":8.6,"pos":7058,"pm":9.5,"l":28,"l5":26,"sec":"S4","r":40,"star":false},{"n":"Octav Onicescu","t":"Colegiul Național","p":"Umanist","s":"Științe Sociale","b":null,"m":8.57,"pos":7118,"pm":9.15,"l":56,"l5":52,"sec":"S4","r":38,"star":false},{"n":"Ștefan Demetrescu","t":"Liceul Teologic Adventist","p":"Real","s":"Științe ale Naturii","b":null,"m":8.57,"pos":7149,"pm":9.55,"l":28,"l5":26,"sec":"S4","r":34,"star":false},{"n":"Aurel Vlaicu","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":8.57,"pos":7167,"pm":8.92,"l":56,"l5":52,"sec":"S1","r":36,"star":false},{"n":"Benjamin Franklin","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":8.57,"pos":7180,"pm":9.17,"l":56,"l5":52,"sec":"S3","r":41,"star":false},{"n":"Eugen Lovinescu","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.55,"pos":7271,"pm":8.9,"l":56,"l5":78,"sec":"S6","r":37,"star":false},{"n":"Ita Wegman","t":"Liceul Teoretic Bilingv","p":"Real","s":"Științe ale Naturii","b":"Limba germană(fără examen)","m":8.55,"pos":7307,"pm":9.47,"l":28,"l5":26,"sec":"S2","r":42,"star":false},{"n":"Marin Preda","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":null,"m":8.52,"pos":7359,"pm":9.1,"l":28,"l5":26,"sec":"S6","r":39,"star":false},{"n":"Octav Onicescu","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":8.52,"pos":7368,"pm":8.95,"l":56,"l5":52,"sec":"S4","r":38,"star":false},{"n":"Victor Babeș","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":8.52,"pos":7419,"pm":9.1,"l":28,"l5":26,"sec":"S2","r":30,"star":false},{"n":"Benjamin Franklin","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":null,"m":8.5,"pos":7502,"pm":9.12,"l":56,"l5":52,"sec":"S3","r":41,"star":false},{"n":"Eugen Lovinescu","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":"Limba portugheză(fără examen)","m":8.5,"pos":7526,"pm":8.72,"l":28,"l5":26,"sec":"S6","r":37,"star":false},{"n":"Victor Babeș","t":"Colegiul Național","p":"Umanist","s":"Științe Sociale","b":null,"m":8.5,"pos":7579,"pm":8.95,"l":28,"l5":26,"sec":"S2","r":30,"star":false},{"n":"A.D.Xenopol","t":"Colegiul Economic","p":"Servicii","s":"Economic","b":null,"m":8.47,"pos":7613,"pm":9.65,"l":168,"l5":144,"sec":"S2","r":43,"star":false},{"n":"C-tin Brâncoveanu","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.47,"pos":7681,"pm":8.97,"l":56,"l5":52,"sec":"S1","r":35,"star":false},{"n":"Victor Babeș","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":8.47,"pos":7682,"pm":9.35,"l":112,"l5":104,"sec":"S2","r":30,"star":false},{"n":"Goethe","t":"Colegiul German","p":"Real","s":"Matematică-Informatică","b":"predare în limba germană","m":8.46,"pos":7716,"pm":9.58,"l":28,"l5":26,"sec":"S1","r":23,"star":false},{"n":"Ștefan Demetrescu","t":"Liceul Teologic Adventist","p":"Umanist","s":"Filologie","b":null,"m":8.45,"pos":7755,"pm":9.5,"l":28,"l5":26,"sec":"S4","r":34,"star":false},{"n":"C-tin Brâncoveanu","t":"Liceul Teoretic","p":"Umanist","s":"Științe Sociale","b":null,"m":8.45,"pos":7819,"pm":9.35,"l":56,"l5":52,"sec":"S1","r":35,"star":false},{"n":"A.D.Xenopol","t":"Colegiul Economic","p":"Servicii","s":"Turism și alimentație","b":null,"m":8.42,"pos":7899,"pm":9.02,"l":56,"l5":48,"sec":"S2","r":43,"star":false},{"n":"Ita Wegman","t":"Liceul Teoretic Bilingv","p":"Umanist","s":"Științe Sociale","b":"Limba germană(fără examen)","m":8.42,"pos":7928,"pm":9.3,"l":28,"l5":26,"sec":"S2","r":42,"star":false},{"n":"Marin Preda","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.4,"pos":7984,"pm":9.27,"l":28,"l5":26,"sec":"S6","r":39,"star":false},{"n":"Petru Maior","t":"Colegiul Tehnic","p":"Real","s":"Matematică-Informatică","b":null,"m":8.4,"pos":8012,"pm":8.65,"l":28,"l5":26,"sec":"S6","r":44,"star":false},{"n":"Mihail Sadoveanu","t":"Liceul Teoretic","p":"Umanist","s":"Științe Sociale","b":null,"m":8.37,"pos":8088,"pm":8.77,"l":56,"l5":78,"sec":"S2","r":45,"star":false},{"n":"Dimitrie Bolintineanu","t":"Liceul Teoretic","p":"Umanist","s":"Științe Sociale","b":null,"m":8.37,"pos":8134,"pm":9.45,"l":28,"l5":26,"sec":"S5","r":46,"star":false},{"n":"Mihail Sadoveanu","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":8.35,"pos":8180,"pm":8.9,"l":84,"l5":78,"sec":"S2","r":45,"star":false},{"n":"Marin Preda","t":"Liceul Teoretic","p":"Umanist","s":"Științe Sociale","b":null,"m":8.35,"pos":8194,"pm":8.77,"l":56,"l5":52,"sec":"S6","r":39,"star":false},{"n":"Benjamin Franklin","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.35,"pos":8240,"pm":8.9,"l":56,"l5":78,"sec":"S3","r":41,"star":false},{"n":"Dimitrie Bolintineanu","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":8.32,"pos":8303,"pm":8.7,"l":56,"l5":52,"sec":"S5","r":46,"star":false},{"n":"Costin C. Kirițescu","t":"Colegiul Economic","p":"Servicii","s":"Economic","b":null,"m":8.3,"pos":8347,"pm":9.35,"l":140,"l5":120,"sec":"S6","r":47,"star":false},{"n":"Costin C. Kirițescu","t":"Colegiul Economic","p":"Servicii","s":"Comerț","b":null,"m":8.2,"pos":8347,"pm":null,"l":28,"l5":null,"sec":"S6","r":47,"star":false},{"n":"Mihail Sadoveanu","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.3,"pos":8372,"pm":8.62,"l":28,"l5":52,"sec":"S2","r":45,"star":false},{"n":"Ioan N. Socolescu","t":"Colegiul Tehnic de Arhitectură și Lucrări Publice","p":"Real","s":"Matematică-Informatică","b":null,"m":8.3,"pos":8429,"pm":8.95,"l":28,"l5":26,"sec":"S1","r":48,"star":false},{"n":"Dimitrie Bolintineanu","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":null,"m":8.25,"pos":8548,"pm":9.05,"l":56,"l5":52,"sec":"S5","r":46,"star":false},{"n":"Dimitrie Bolintineanu","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.22,"pos":8638,"pm":8.6,"l":56,"l5":52,"sec":"S5","r":46,"star":false},{"n":"Petru Maior","t":"Colegiul Tehnic","p":"Umanist","s":"Științe Sociale","b":null,"m":8.22,"pos":8713,"pm":8.7,"l":28,"l5":26,"sec":"S6","r":44,"star":false},{"n":"Petru Maior","t":"Colegiul Tehnic","p":"Umanist","s":"Filologie","b":null,"m":8.22,"pos":8719,"pm":8.82,"l":56,"l5":26,"sec":"S6","r":44,"star":false},{"n":"Decebal","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":8.2,"pos":8758,"pm":8.5,"l":28,"l5":26,"sec":"S3","r":49,"star":false},{"n":"Costin C. Kirițescu","t":"Colegiul Economic","p":"Servicii","s":"Turism și alimentație","b":null,"m":8.2,"pos":8777,"pm":8.7,"l":84,"l5":72,"sec":"S6","r":47,"star":false},{"n":"Mircea Eliade","t":"Liceul Cu Program Sportiv","p":"Real","s":"Științe ale Naturii","b":null,"m":8.17,"pos":8871,"pm":9.32,"l":28,"l5":26,"sec":"S6","r":50,"star":false},{"n":"Mircea Eliade","t":"Liceul Cu Program Sportiv","p":"Umanist","s":"Științe Sociale","b":null,"m":8.17,"pos":8877,"pm":8.7,"l":28,"l5":26,"sec":"S6","r":50,"star":false},{"n":"Decebal","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.0,"pos":9510,"pm":8.4,"l":84,"l5":52,"sec":"S3","r":49,"star":false},{"n":"Decebal","t":"Liceul Teoretic","p":"Umanist","s":"Științe Sociale","b":null,"m":7.92,"pos":9778,"pm":8.9,"l":84,"l5":104,"sec":"S3","r":49,"star":false},{"n":"Petru Maior","t":"Colegiul Tehnic","p":"Resurse naturale si Protecția mediului","s":"Protecția mediului","b":null,"m":7.9,"pos":9808,"pm":8.32,"l":28,"l5":48,"sec":"S6","r":44,"star":false},{"n":"Ioan N. Socolescu","t":"Colegiul Tehnic de Arhitectură și Lucrări Publice","p":"Tehnic","s":"Construcții, instalații și lucrări publice","b":null,"m":7.37,"pos":11298,"pm":8.27,"l":28,"l5":48,"sec":"S1","r":48,"star":false},{"n":"Petru Maior","t":"Colegiul Tehnic","p":"Tehnic","s":"Electric","b":null,"m":7.02,"pos":12099,"pm":7.92,"l":28,"l5":48,"sec":"S6","r":44,"star":false},{"n":"Dante Alighieri","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":"predare în limba italiană","m":6.77,"pos":12618,"pm":9.11,"l":28,"l5":26,"sec":"S3","r":27,"star":false},{"n":"Petru Maior","t":"Colegiul Tehnic","p":"Tehnic","s":"Mecanică","b":null,"m":6.75,"pos":12664,"pm":7.37,"l":28,"l5":24,"sec":"S6","r":44,"star":false},{"n":"Goethe","t":"Colegiul German","p":"Umanist","s":"Filologie","b":"predare în limba germană","m":6.31,"pos":13462,"pm":9.15,"l":28,"l5":52,"sec":"S1","r":23,"star":false},{"n":"George Coșbuc","t":"Colegiul Național Bilingv","p":"Real","s":"Științe ale Naturii","b":"Limba engleză(cu examen)","m":9.57,"pos":1494,"pm":9.82,"l":28,"l5":26,"sec":"S2","r":7,"star":false},{"n":"George Coșbuc","t":"Colegiul Național Bilingv","p":"Real","s":"Matematică-Informatică","b":"Limba engleză(cu examen)","m":9.5,"pos":1932,"pm":9.82,"l":56,"l5":52,"sec":"S2","r":7,"star":false},{"n":"George Coșbuc","t":"Colegiul Național Bilingv","p":"Umanist","s":"Științe Sociale","b":"Limba engleză(cu examen)","m":9.47,"pos":2169,"pm":9.92,"l":28,"l5":26,"sec":"S2","r":7,"star":false},{"n":"George Coșbuc","t":"Colegiul Național Bilingv","p":"Umanist","s":"Filologie","b":"Limba engleză(cu examen)","m":9.3,"pos":3147,"pm":9.57,"l":56,"l5":52,"sec":"S2","r":7,"star":false},{"n":"Traian","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":8.17,"pos":8903,"pm":8.6,"l":28,"l5":52,"sec":"S2","r":51,"star":false},{"n":"Nichita Stănescu","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":8.17,"pos":8914,"pm":8.75,"l":56,"l5":52,"sec":"S3","r":52,"star":false},{"n":"Lucian Blaga","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":8.17,"pos":8922,"pm":8.67,"l":28,"l5":26,"sec":"S2","r":53,"star":false},{"n":"Timotei Cipariu","t":"Liceul Greco-Catolic","p":"Real","s":"Matematică-Informatică","b":null,"m":8.1,"pos":9191,"pm":8.95,"l":56,"l5":52,"sec":"S6","r":54,"star":false},{"n":"Traian","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":null,"m":8.07,"pos":9224,"pm":8.9,"l":56,"l5":52,"sec":"S2","r":51,"star":false},{"n":"Lucian Blaga","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":null,"m":8.07,"pos":9280,"pm":8.57,"l":56,"l5":52,"sec":"S2","r":53,"star":false},{"n":"Lucian Blaga","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.05,"pos":9347,"pm":8.55,"l":28,"l5":26,"sec":"S2","r":53,"star":false},{"n":"Lucian Blaga","t":"Liceul Teoretic","p":"Umanist","s":"Științe Sociale","b":null,"m":8.05,"pos":9366,"pm":8.27,"l":56,"l5":52,"sec":"S2","r":53,"star":false},{"n":"Nichita Stănescu","t":"Liceul Teoretic","p":"Umanist","s":"Științe Sociale","b":null,"m":8.02,"pos":9377,"pm":8.7,"l":112,"l5":104,"sec":"S3","r":52,"star":false},{"n":"Traian","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.02,"pos":9385,"pm":8.5,"l":56,"l5":52,"sec":"S2","r":51,"star":false},{"n":"Hermes","t":"Colegiul Economic","p":"Servicii","s":"Economic","b":null,"m":8.02,"pos":9392,"pm":8.6,"l":140,"l5":120,"sec":"S2","r":55,"star":false},{"n":"Gheorghe Asachi","t":"Colegiul Tehnic","p":"Real","s":"Științe ale Naturii","b":null,"m":8.02,"pos":9426,"pm":8.52,"l":28,"l5":26,"sec":"S6","r":56,"star":false},{"n":"Traian","t":"Liceul Teoretic","p":"Umanist","s":"Științe Sociale","b":null,"m":8.0,"pos":9465,"pm":9.2,"l":56,"l5":52,"sec":"S2","r":51,"star":false},{"n":"Henri Coandă","t":"Colegiul Tehnic de Aeronautică","p":"Real","s":"Matematică-Informatică","b":null,"m":8.0,"pos":9500,"pm":8.52,"l":28,"l5":26,"sec":"S1","r":57,"star":false},{"n":"Hermes","t":"Colegiul Economic","p":"Servicii","s":"Turism și alimentație","b":null,"m":7.97,"pos":9618,"pm":8.32,"l":84,"l5":48,"sec":"S2","r":55,"star":false},{"n":"Henri Coandă","t":"Colegiul Tehnic de Aeronautică","p":"Umanist","s":"Filologie","b":null,"m":7.97,"pos":9627,"pm":8.45,"l":28,"l5":26,"sec":"S1","r":57,"star":false},{"n":"Gheorghe Asachi","t":"Colegiul Tehnic","p":"Umanist","s":"Științe Sociale","b":null,"m":7.95,"pos":9688,"pm":8.62,"l":56,"l5":52,"sec":"S6","r":56,"star":false},{"n":"Hermes","t":"Colegiul Economic","p":"Servicii","s":"Comerț","b":null,"m":7.92,"pos":9726,"pm":8.17,"l":56,"l5":24,"sec":"S2","r":55,"star":false},{"n":"Hristo Botev","t":"Liceul Teoretic Bulgar","p":"Umanist","s":"Filologie","b":null,"m":7.9,"pos":9843,"pm":8.15,"l":28,"l5":26,"sec":"S1","r":58,"star":false},{"n":"Mihai Bravu","t":"Colegiul Tehnic","p":"Real","s":"Științe ale Naturii","b":null,"m":7.87,"pos":9885,"pm":8.12,"l":56,"l5":26,"sec":"S3","r":59,"star":false},{"n":"Dimitrie Leonida","t":"Colegiul Tehnic","p":"Real","s":"Matematică-Informatică","b":null,"m":7.82,"pos":10042,"pm":8.97,"l":28,"l5":26,"sec":"S2","r":60,"star":false},{"n":"Costin D. Nenițescu","t":"Colegiul Tehnic","p":"Umanist","s":"Filologie","b":null,"m":7.82,"pos":10105,"pm":8.82,"l":28,"l5":26,"sec":"S3","r":61,"star":false},{"n":"Grigore Cerchez","t":"Colegiul Tehnologic","p":"Umanist","s":"Științe Sociale","b":null,"m":7.8,"pos":10116,"pm":8.42,"l":56,"l5":52,"sec":"S5","r":62,"star":false},{"n":"Grigore Cerchez","t":"Colegiul Tehnologic","p":"Real","s":"Științe ale Naturii","b":null,"m":7.8,"pos":10157,"pm":8.52,"l":28,"l5":26,"sec":"S5","r":62,"star":false},{"n":"Dinicu Golescu","t":"Colegiul Tehnic","p":"Umanist","s":"Filologie","b":null,"m":7.8,"pos":10174,"pm":8.02,"l":28,"l5":26,"sec":"S1","r":63,"star":false},{"n":"Media","t":"Colegiul Tehnic","p":"Umanist","s":"Filologie","b":null,"m":7.77,"pos":10203,"pm":8.27,"l":28,"l5":26,"sec":"S1","r":64,"star":false},{"n":"Costin D. Nenițescu","t":"Colegiul Tehnic","p":"Real","s":"Științe ale Naturii","b":null,"m":7.75,"pos":10269,"pm":8.35,"l":28,"l5":52,"sec":"S3","r":61,"star":false},{"n":"Costin D. Nenițescu","t":"Colegiul Tehnic","p":"Umanist","s":"Științe Sociale","b":null,"m":7.75,"pos":10276,"pm":8.22,"l":28,"l5":52,"sec":"S3","r":61,"star":false},{"n":"Sfântul Pantelimon","t":"Liceul Tehnologic","p":"Umanist","s":"Științe Sociale","b":null,"m":7.72,"pos":10342,"pm":8.2,"l":28,"l5":26,"sec":"S2","r":65,"star":false},{"n":"Mihai I","t":"Colegiul Tehnic Feroviar","p":"Real","s":"Matematică-Informatică","b":null,"m":7.72,"pos":10381,"pm":8.37,"l":28,"l5":26,"sec":"S1","r":66,"star":false},{"n":"Traian Vuia","t":"Liceul Tehnologic de Metrologie","p":"Real","s":"Matematică-Informatică","b":null,"m":7.67,"pos":10495,"pm":9.25,"l":28,"l5":26,"sec":"S4","r":67,"star":false},{"n":"Dimitrie Leonida","t":"Colegiul Tehnic","p":"Real","s":"Științe ale Naturii","b":null,"m":7.67,"pos":10496,"pm":8.17,"l":28,"l5":26,"sec":"S2","r":60,"star":false},{"n":"Sf. Antim Ivireanu","t":"Liceul Tehnologic","p":"Servicii","s":"Turism și alimentație","b":null,"m":7.65,"pos":10556,"pm":8.37,"l":56,"l5":72,"sec":"S6","r":68,"star":false},{"n":"Sfântul Pantelimon","t":"Liceul Tehnologic","p":"Real","s":"Științe ale Naturii","b":null,"m":7.65,"pos":10578,"pm":8.15,"l":28,"l5":26,"sec":"S2","r":65,"star":false},{"n":"Hristo Botev","t":"Liceul Teoretic Bulgar","p":"Umanist","s":"Filologie","b":"Limba neogreacă(fără examen)","m":7.65,"pos":10580,"pm":8.32,"l":14,"l5":13,"sec":"S1","r":58,"star":false},{"n":"Dimitrie Paciurea","t":"Liceul","p":"Umanist","s":"Filologie","b":null,"m":7.65,"pos":10590,"pm":8.27,"l":28,"l5":26,"sec":"S1","r":69,"star":false},{"n":"Traian Vuia","t":"Liceul Tehnologic de Metrologie","p":"Umanist","s":"Filologie","b":null,"m":7.62,"pos":10634,"pm":7.97,"l":56,"l5":26,"sec":"S4","r":67,"star":false},{"n":"Carol I","t":"Colegiul Tehnic","p":"Umanist","s":"Științe Sociale","b":null,"m":7.6,"pos":10698,"pm":8.12,"l":56,"l5":52,"sec":"S6","r":70,"star":false},{"n":"Gheorghe Airinei","t":"Colegiul Tehnic de Poștă și Telecomunicații","p":"Real","s":"Științe ale Naturii","b":null,"m":7.6,"pos":10700,"pm":8.1,"l":56,"l5":52,"sec":"S6","r":71,"star":false},{"n":"Traian Vuia","t":"Liceul Tehnologic de Metrologie","p":"Real","s":"Științe ale Naturii","b":null,"m":7.6,"pos":10735,"pm":8.3,"l":56,"l5":26,"sec":"S4","r":67,"star":false},{"n":"Grigore Cerchez","t":"Colegiul Tehnologic","p":"Servicii","s":"Economic","b":null,"m":7.55,"pos":10833,"pm":7.9,"l":28,"l5":48,"sec":"S5","r":62,"star":false},{"n":"Valter Mărăcineanu","t":"Colegiul Tehnic","p":"Umanist","s":"Filologie","b":null,"m":7.5,"pos":10953,"pm":8.32,"l":28,"l5":26,"sec":"S1","r":72,"star":false},{"n":"Theodor Pallady","t":"Liceul Tehnologic","p":"Umanist","s":"Filologie","b":null,"m":7.47,"pos":11050,"pm":8.22,"l":28,"l5":26,"sec":"S3","r":73,"star":false},{"n":"Carol I","t":"Colegiul Tehnic","p":"Real","s":"Științe ale Naturii","b":null,"m":7.47,"pos":11063,"pm":7.92,"l":28,"l5":26,"sec":"S6","r":70,"star":false},{"n":"Gheorghe Airinei","t":"Colegiul Tehnic de Poștă și Telecomunicații","p":"Umanist","s":"Științe Sociale","b":null,"m":7.45,"pos":11096,"pm":8.07,"l":84,"l5":78,"sec":"S6","r":71,"star":false},{"n":"Energetic","t":"Colegiul Tehnic","p":"Real","s":"Matematică-Informatică","b":null,"m":7.42,"pos":11142,"pm":8.37,"l":28,"l5":26,"sec":"S5","r":74,"star":false},{"n":"Dimitrie Gusti","t":"Liceul Tehnologic","p":"Umanist","s":"Științe Sociale","b":null,"m":7.42,"pos":11154,"pm":8.02,"l":56,"l5":52,"sec":"S5","r":75,"star":false},{"n":"Dimitrie Gusti","t":"Liceul Tehnologic","p":"Real","s":"Științe ale Naturii","b":null,"m":7.4,"pos":11204,"pm":7.85,"l":28,"l5":26,"sec":"S5","r":75,"star":false},{"n":"Constantin Brâncuși","t":"Liceul Tehnologic","p":"Servicii","s":"Economic","b":null,"m":7.37,"pos":11278,"pm":8.07,"l":56,"l5":48,"sec":"S2","r":76,"star":false},{"n":"Mihai Bravu","t":"Colegiul Tehnic","p":"Servicii","s":"Turism și alimentație","b":null,"m":7.37,"pos":11283,"pm":7.92,"l":140,"l5":72,"sec":"S3","r":59,"star":false},{"n":"Hristo Botev","t":"Liceul Teoretic Bulgar","p":"Umanist","s":"Filologie","b":"Limba rusă(fără examen)","m":7.3,"pos":11467,"pm":7.77,"l":14,"l5":13,"sec":"S1","r":58,"star":false},{"n":"Energetic","t":"Colegiul Tehnic","p":"Umanist","s":"Filologie","b":null,"m":7.25,"pos":11612,"pm":8.15,"l":56,"l5":52,"sec":"S5","r":74,"star":false},{"n":"Iuliu Maniu","t":"Colegiul Tehnic","p":"Real","s":"Științe ale Naturii","b":null,"m":7.22,"pos":11637,"pm":8.1,"l":28,"l5":26,"sec":"S6","r":77,"star":false},{"n":"Mihai I","t":"Colegiul Tehnic Feroviar","p":"Real","s":"Științe ale Naturii","b":null,"m":7.22,"pos":11649,"pm":7.85,"l":56,"l5":52,"sec":"S1","r":66,"star":false},{"n":"Dinicu Golescu","t":"Colegiul Tehnic","p":"Servicii","s":"Turism și alimentație","b":null,"m":7.2,"pos":11736,"pm":8.05,"l":56,"l5":48,"sec":"S1","r":63,"star":false},{"n":"Anghel Saligny","t":"Colegiul Tehnic","p":"Servicii","s":"Economic","b":null,"m":7.2,"pos":11738,"pm":8.1,"l":84,"l5":72,"sec":"S3","r":78,"star":false},{"n":"Hristo Botev","t":"Liceul Teoretic Bulgar","p":"Umanist","s":"Filologie","b":"Limba bulgară(fără examen)","m":7.15,"pos":11825,"pm":7.85,"l":14,"l5":13,"sec":"S1","r":58,"star":false},{"n":"Gheorghe Asachi","t":"Colegiul Tehnic","p":"Tehnic","s":"Producție media","b":null,"m":7.12,"pos":11895,"pm":7.92,"l":56,"l5":72,"sec":"S6","r":56,"star":false},{"n":"Constantin Brâncuși","t":"Liceul Tehnologic","p":"Servicii","s":"Turism și alimentație","b":null,"m":7.1,"pos":11930,"pm":8.05,"l":28,"l5":48,"sec":"S2","r":76,"star":false},{"n":"Gheorghe Airinei","t":"Colegiul Tehnic de Poștă și Telecomunicații","p":"Servicii","s":"Economic","b":null,"m":7.1,"pos":11952,"pm":8.62,"l":56,"l5":48,"sec":"S6","r":71,"star":false},{"n":"Iuliu Maniu","t":"Colegiul Tehnic","p":"Umanist","s":"Științe Sociale","b":null,"m":7.07,"pos":11981,"pm":8.02,"l":84,"l5":78,"sec":"S6","r":77,"star":false},{"n":"Dimitrie Leonida","t":"Colegiul Tehnic","p":"Resurse naturale si Protecția mediului","s":"Protecția mediului","b":null,"m":7.07,"pos":11982,"pm":7.75,"l":28,"l5":24,"sec":"S2","r":60,"star":false},{"n":"Anghel Saligny","t":"Colegiul Tehnic","p":"Resurse naturale si Protecția mediului","s":"Protecția mediului","b":null,"m":7.07,"pos":12021,"pm":7.62,"l":28,"l5":24,"sec":"S3","r":78,"star":false},{"n":"Nikola Tesla","t":"Liceul Tehnologic","p":"Servicii","s":"Economic","b":null,"m":6.97,"pos":12210,"pm":7.87,"l":56,"l5":72,"sec":"S2","r":79,"star":false},{"n":"Viilor","t":"Colegiul Economic","p":"Servicii","s":"Economic","b":null,"m":6.97,"pos":12224,"pm":8.02,"l":140,"l5":72,"sec":"S5","r":80,"star":false},{"n":"Gheorghe Airinei","t":"Colegiul Tehnic de Poștă și Telecomunicații","p":"Servicii","s":"Turism și alimentație","b":null,"m":6.92,"pos":12356,"pm":8.72,"l":56,"l5":48,"sec":"S6","r":71,"star":false},{"n":"Constantin Brâncuși","t":"Liceul Tehnologic","p":"Resurse naturale si Protecția mediului","s":"Protecția mediului","b":null,"m":6.87,"pos":12457,"pm":7.35,"l":28,"l5":24,"sec":"S2","r":76,"star":false},{"n":"Grigore Cerchez","t":"Colegiul Tehnologic","p":"Servicii","s":"Turism și alimentație","b":null,"m":6.82,"pos":12549,"pm":8.22,"l":84,"l5":72,"sec":"S5","r":62,"star":false},{"n":"Carol I","t":"Colegiul Tehnic","p":"Resurse naturale si Protecția mediului","s":"Protecția mediului","b":null,"m":6.8,"pos":12556,"pm":8.2,"l":28,"l5":48,"sec":"S6","r":70,"star":false},{"n":"Henri Coandă","t":"Colegiul Tehnic de Aeronautică","p":"Tehnic","s":"Mecanică","b":null,"m":6.75,"pos":12654,"pm":8.0,"l":84,"l5":48,"sec":"S1","r":57,"star":false},{"n":"Viaceslav Harnaj","t":"Colegiul Tehnologic","p":"Servicii","s":"Economic","b":null,"m":6.75,"pos":12665,"pm":8.35,"l":56,"l5":48,"sec":"S1","r":81,"star":false},{"n":"Hristo Botev","t":"Liceul Teoretic Bulgar","p":"Real","s":"Matematică-Informatică","b":"Limba bulgară(fără examen)","m":6.7,"pos":12759,"pm":7.92,"l":28,"l5":26,"sec":"S1","r":58,"star":false},{"n":"Nr. 1","t":"Liceul Economic","p":"Servicii","s":"Economic","b":null,"m":6.7,"pos":12761,"pm":8.35,"l":196,"l5":120,"sec":"S4","r":82,"star":false},{"n":"Traian Vuia","t":"Liceul Tehnologic de Metrologie","p":"Resurse naturale si Protecția mediului","s":"Protecția mediului","b":null,"m":6.67,"pos":12816,"pm":7.42,"l":28,"l5":24,"sec":"S4","r":67,"star":false},{"n":"Valter Mărăcineanu","t":"Colegiul Tehnic","p":"Servicii","s":"Turism și alimentație","b":null,"m":6.62,"pos":12928,"pm":7.65,"l":84,"l5":48,"sec":"S1","r":72,"star":false},{"n":"Nr. 1","t":"Liceul Economic","p":"Servicii","s":"Turism și alimentație","b":null,"m":6.6,"pos":12955,"pm":8.27,"l":56,"l5":48,"sec":"S4","r":82,"star":false},{"n":"Hristo Botev","t":"Liceul Teoretic Bulgar","p":"Umanist","s":"Filologie","b":"Limba rromani(fără examen)","m":6.6,"pos":12959,"pm":7.05,"l":14,"l5":13,"sec":"S1","r":58,"star":false},{"n":"Costin D. Nenițescu","t":"Colegiul Tehnic","p":"Tehnic","s":"Chimie industrială","b":null,"m":6.55,"pos":13079,"pm":8.27,"l":84,"l5":96,"sec":"S3","r":61,"star":false},{"n":"Anghel Saligny","t":"Colegiul Tehnic","p":"Tehnic","s":"Construcții, instalații și lucrări publice","b":null,"m":6.5,"pos":13148,"pm":8.02,"l":84,"l5":24,"sec":"S3","r":78,"star":false},{"n":"Dimitrie Leonida","t":"Colegiul Tehnic","p":"Tehnic","s":"Electronică automatizări","b":null,"m":6.43,"pos":13260,"pm":8.15,"l":0,"l5":24,"sec":"S2","r":60,"star":false},{"n":"Energetic","t":"Colegiul Tehnic","p":"Servicii","s":"Turism și alimentație","b":null,"m":6.4,"pos":13333,"pm":7.62,"l":56,"l5":48,"sec":"S5","r":74,"star":false},{"n":"Ady Endre","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":"predare în limba maghiară","m":6.38,"pos":13347,"pm":9.01,"l":28,"l5":26,"sec":"S2","r":83,"star":false},{"n":"Gheorghe Asachi","t":"Colegiul Tehnic","p":"Tehnic","s":"Industrie textilă și pielărie","b":null,"m":6.35,"pos":13427,"pm":7.9,"l":56,"l5":48,"sec":"S6","r":56,"star":false},{"n":"Dragomir Hurmuzescu","t":"Liceul Tehnologic","p":"Servicii","s":"Economic","b":null,"m":6.32,"pos":13449,"pm":7.3,"l":112,"l5":72,"sec":"S3","r":84,"star":false},{"n":"Traian Vuia","t":"Liceul Tehnologic de Metrologie","p":"Tehnic","s":"Electric","b":null,"m":6.27,"pos":13547,"pm":7.57,"l":28,"l5":24,"sec":"S4","r":67,"star":false},{"n":"Gheorghe Airinei","t":"Colegiul Tehnic de Poștă și Telecomunicații","p":"Tehnic","s":"Electronică automatizări","b":null,"m":6.25,"pos":13560,"pm":8.8,"l":56,"l5":48,"sec":"S6","r":71,"star":false},{"n":"Nikola Tesla","t":"Liceul Tehnologic","p":"Resurse naturale si Protecția mediului","s":"Protecția mediului","b":null,"m":6.22,"pos":13611,"pm":8.37,"l":28,"l5":24,"sec":"S2","r":79,"star":false},{"n":"Costin D. Nenițescu","t":"Colegiul Tehnic","p":"Resurse naturale si Protecția mediului","s":"Industrie alimentară","b":null,"m":6.2,"pos":13661,"pm":7.2,"l":28,"l5":48,"sec":"S3","r":61,"star":false},{"n":"Ion I.C. Brătianu","t":"Liceul Tehnologic","p":"Servicii","s":"Turism și alimentație","b":null,"m":6.15,"pos":13741,"pm":7.27,"l":84,"l5":72,"sec":"S2","r":85,"star":false},{"n":"Viilor","t":"Colegiul Economic","p":"Servicii","s":"Comerț","b":null,"m":6.12,"pos":13780,"pm":7.45,"l":56,"l5":48,"sec":"S5","r":80,"star":false},{"n":"Viaceslav Harnaj","t":"Colegiul Tehnologic","p":"Servicii","s":"Turism și alimentație","b":null,"m":6.1,"pos":13798,"pm":8.57,"l":56,"l5":48,"sec":"S1","r":81,"star":false},{"n":"Dragomir Hurmuzescu","t":"Liceul Tehnologic","p":"Servicii","s":"Comerț","b":null,"m":6.02,"pos":13908,"pm":7.05,"l":28,"l5":24,"sec":"S3","r":84,"star":false},{"n":"Costin D. Nenițescu","t":"Colegiul Tehnic","p":"Resurse naturale si Protecția mediului","s":"Protecția mediului","b":null,"m":6.02,"pos":13923,"pm":7.5,"l":28,"l5":96,"sec":"S3","r":61,"star":false},{"n":"Viilor","t":"Colegiul Economic","p":"Servicii","s":"Turism și alimentație","b":null,"m":6.0,"pos":13952,"pm":8.77,"l":252,"l5":192,"sec":"S5","r":80,"star":false},{"n":"Traian Vuia","t":"Liceul Tehnologic de Metrologie","p":"Tehnic","s":"Electronică automatizări","b":null,"m":5.92,"pos":14055,"pm":6.87,"l":28,"l5":24,"sec":"S4","r":67,"star":false},{"n":"Henri Coandă","t":"Colegiul Tehnic de Aeronautică","p":"Tehnic","s":"Electromecanică","b":null,"m":5.85,"pos":14134,"pm":8.05,"l":84,"l5":96,"sec":"S1","r":57,"star":false},{"n":"Grigore Cerchez","t":"Colegiul Tehnologic","p":"Tehnic","s":"Mecanică","b":null,"m":5.82,"pos":14183,"pm":8.07,"l":28,"l5":24,"sec":"S5","r":62,"star":false},{"n":"Iuliu Maniu","t":"Colegiul Tehnic","p":"Servicii","s":"Turism și alimentație","b":null,"m":5.8,"pos":14228,"pm":7.72,"l":56,"l5":48,"sec":"S6","r":77,"star":false},{"n":"Costin D. Nenițescu","t":"Colegiul Tehnic","p":"Tehnic","s":"Electric","b":null,"m":5.7,"pos":14356,"pm":7.07,"l":0,"l5":48,"sec":"S3","r":61,"star":false},{"n":"Carol I","t":"Colegiul Tehnic","p":"Tehnic","s":"Electronică automatizări","b":null,"m":5.67,"pos":14387,"pm":7.6,"l":28,"l5":24,"sec":"S6","r":70,"star":false},{"n":"Sfântul Pantelimon","t":"Liceul Tehnologic","p":"Tehnic","s":"Mecanică","b":null,"m":5.65,"pos":14414,"pm":7.6,"l":28,"l5":48,"sec":"S2","r":65,"star":false},{"n":"Nikola Tesla","t":"Liceul Tehnologic","p":"Tehnic","s":"Electric","b":null,"m":5.62,"pos":14446,"pm":6.95,"l":56,"l5":24,"sec":"S2","r":79,"star":false},{"n":"Mircea cel Bătrân","t":"Colegiul Tehnic","p":"Servicii","s":"Economic","b":null,"m":5.6,"pos":14488,"pm":7.62,"l":112,"l5":120,"sec":"S1","r":86,"star":false},{"n":"Elie Radu","t":"Liceul Tehnologic","p":"Servicii","s":"Economic","b":null,"m":5.4,"pos":14689,"pm":7.32,"l":112,"l5":96,"sec":"S3","r":87,"star":false},{"n":"Dragomir Hurmuzescu","t":"Liceul Tehnologic","p":"Servicii","s":"Estetica și igiena corpului omenesc","b":null,"m":5.4,"pos":14692,"pm":7.15,"l":84,"l5":72,"sec":"S3","r":84,"star":false},{"n":"Dacia","t":"Liceul Tehnologic","p":"Resurse naturale si Protecția mediului","s":"Protecția mediului","b":null,"m":5.32,"pos":14770,"pm":6.42,"l":28,"l5":24,"sec":"S4","r":88,"star":false},{"n":"Iuliu Maniu","t":"Colegiul Tehnic","p":"Tehnic","s":"Electric","b":null,"m":5.3,"pos":14772,"pm":6.9,"l":28,"l5":24,"sec":"S6","r":77,"star":false},{"n":"Nikola Tesla","t":"Liceul Tehnologic","p":"Tehnic","s":"Electronică automatizări","b":null,"m":5.3,"pos":14795,"pm":8.0,"l":28,"l5":24,"sec":"S2","r":79,"star":false},{"n":"Ion I.C. Brătianu","t":"Liceul Tehnologic","p":"Tehnic","s":"Electric","b":null,"m":5.27,"pos":14808,"pm":7.42,"l":28,"l5":24,"sec":"S2","r":85,"star":false},{"n":"Mihai Bravu","t":"Colegiul Tehnic","p":"Tehnic","s":"Construcții, instalații și lucrări publice","b":null,"m":5.12,"pos":14976,"pm":6.9,"l":126,"l5":72,"sec":"S3","r":59,"star":false},{"n":"Mihai Bravu","t":"Colegiul Tehnic","p":"Tehnic","s":"Electric","b":null,"m":5.12,"pos":14980,"pm":6.92,"l":42,"l5":24,"sec":"S3","r":59,"star":false},{"n":"Constantin Brâncuși","t":"Liceul Tehnologic","p":"Tehnic","s":"Fabricarea produselor din lemn","b":null,"m":5.12,"pos":14981,"pm":7.22,"l":56,"l5":72,"sec":"S2","r":76,"star":false},{"n":"Petru Poni","t":"Liceul Tehnologic","p":"Tehnic","s":"Mecanică","b":null,"m":5.1,"pos":15008,"pm":6.65,"l":56,"l5":24,"sec":"S6","r":89,"star":false},{"n":"Energetic","t":"Colegiul Tehnic","p":"Tehnic","s":"Electric","b":null,"m":5.02,"pos":15040,"pm":7.67,"l":56,"l5":48,"sec":"S5","r":74,"star":false},{"n":"Mihai I","t":"Colegiul Tehnic Feroviar","p":"Tehnic","s":"Electric","b":null,"m":5.0,"pos":15070,"pm":7.4,"l":0,"l5":24,"sec":"S1","r":66,"star":false},{"n":"Petru Poni","t":"Liceul Tehnologic","p":"Servicii","s":"Economic","b":null,"m":4.92,"pos":15135,"pm":6.87,"l":84,"l5":72,"sec":"S6","r":89,"star":false},{"n":"Mihai Bravu","t":"Colegiul Tehnic","p":"Tehnic","s":"Mecanică","b":null,"m":4.85,"pos":15179,"pm":5.7,"l":0,"l5":24,"sec":"S3","r":59,"star":false},{"n":"Iuliu Maniu","t":"Colegiul Tehnic","p":"Tehnic","s":"Mecanică","b":null,"m":4.75,"pos":15239,"pm":6.6,"l":56,"l5":24,"sec":"S6","r":77,"star":false},{"n":"Valter Mărăcineanu","t":"Colegiul Tehnic","p":"Tehnic","s":"Mecanică","b":null,"m":4.62,"pos":15312,"pm":7.47,"l":56,"l5":24,"sec":"S1","r":72,"star":false},{"n":"Dimitrie Gusti","t":"Liceul Tehnologic","p":"Tehnic","s":"Mecanică","b":null,"m":4.6,"pos":15330,"pm":7.95,"l":84,"l5":72,"sec":"S5","r":75,"star":false},{"n":"Media","t":"Colegiul Tehnic","p":"Tehnic","s":"Producție media","b":null,"m":4.52,"pos":15357,"pm":8.0,"l":196,"l5":192,"sec":"S1","r":64,"star":false},{"n":"Media","t":"Colegiul Tehnic","p":"Tehnic","s":"Tehnici poligrafice","b":null,"m":4.32,"pos":15468,"pm":6.42,"l":28,"l5":24,"sec":"S1","r":64,"star":false},{"n":"Dragomir Hurmuzescu","t":"Liceul Tehnologic","p":"Tehnic","s":"Electromecanică","b":null,"m":4.27,"pos":15485,"pm":7.25,"l":0,"l5":24,"sec":"S3","r":84,"star":false},{"n":"Dimitrie Leonida","t":"Colegiul Tehnic","p":"Tehnic","s":"Mecanică","b":null,"m":4.27,"pos":15492,"pm":7.42,"l":84,"l5":72,"sec":"S2","r":60,"star":false},{"n":"Dinicu Golescu","t":"Colegiul Tehnic","p":"Tehnic","s":"Mecanică","b":null,"m":4.2,"pos":15517,"pm":8.02,"l":84,"l5":72,"sec":"S1","r":63,"star":false},{"n":"Elie Radu","t":"Liceul Tehnologic","p":"Tehnic","s":"Mecanică","b":null,"m":4.1,"pos":15568,"pm":5.77,"l":84,"l5":48,"sec":"S3","r":87,"star":false},{"n":"Energetic","t":"Colegiul Tehnic","p":"Tehnic","s":"Mecanică","b":null,"m":3.85,"pos":15639,"pm":6.27,"l":28,"l5":48,"sec":"S5","r":74,"star":false},{"n":"Theodor Pallady","t":"Liceul Tehnologic","p":"Tehnic","s":"Electronică automatizări","b":null,"m":3.67,"pos":15679,"pm":7.85,"l":56,"l5":24,"sec":"S3","r":73,"star":false},{"n":"Theodor Pallady","t":"Liceul Tehnologic","p":"Tehnic","s":"Electric","b":null,"m":2.85,"pos":15787,"pm":8.8,"l":28,"l5":24,"sec":"S3","r":73,"star":false},{"n":"Dacia","t":"Liceul Tehnologic","p":"Tehnic","s":"Mecanică","b":null,"m":2.75,"pos":15791,"pm":5.75,"l":56,"l5":96,"sec":"S4","r":88,"star":false},{"n":"Edmond Nicolau","t":"Colegiul Tehnic","p":"Tehnic","s":"Mecanică","b":null,"m":2.75,"pos":15792,"pm":5.85,"l":28,"l5":48,"sec":"S2","r":90,"star":false},{"n":"Edmond Nicolau","t":"Colegiul Tehnic","p":"Tehnic","s":"Electronică automatizări","b":null,"m":2.42,"pos":15805,"pm":7.42,"l":28,"l5":48,"sec":"S2","r":90,"star":false},{"n":"Dumitru Moțoc","t":"Colegiul Tehnic de Industrie Alimentară","p":"Resurse naturale si Protecția mediului","s":"Industrie alimentară","b":null,"m":2.4,"pos":15806,"pm":7.5,"l":196,"l5":192,"sec":"S5","r":91,"star":false},{"n":"Ion I.C. Brătianu","t":"Liceul Tehnologic","p":"Tehnic","s":"Mecanică","b":null,"m":2.4,"pos":15807,"pm":7.3,"l":140,"l5":72,"sec":"S2","r":85,"star":false},{"n":"Mircea cel Bătrân","t":"Colegiul Tehnic","p":"Tehnic","s":"Mecanică","b":null,"m":2.37,"pos":15808,"pm":6.35,"l":84,"l5":72,"sec":"S1","r":86,"star":false},{"n":"Viaceslav Harnaj","t":"Colegiul Tehnologic","p":"Resurse naturale si Protecția mediului","s":"Agricultură","b":null,"m":2.25,"pos":15809,"pm":8.47,"l":112,"l5":96,"sec":"S1","r":81,"star":false},{"n":"Petru Poni","t":"Liceul Tehnologic","p":"Tehnic","s":"Electric","b":null,"m":2.25,"pos":15810,"pm":6.95,"l":56,"l5":72,"sec":"S6","r":89,"star":false},{"n":"Theodor Pallady","t":"Liceul Tehnologic","p":"Tehnic","s":"Mecanică","b":null,"m":2.05,"pos":15811,"pm":6.5,"l":84,"l5":96,"sec":"S3","r":73,"star":false},{"n":"Carol I","t":"Colegiul Tehnic","p":"Tehnic","s":"Mecanică","b":null,"m":1.85,"pos":15812,"pm":6.15,"l":56,"l5":48,"sec":"S6","r":70,"star":false}];

// Validare metoda pe poziție (pos_N ≈ pos_(N-1)) — PANEL COMPLET, nu top50.
// Sursă: LiceeB-2026_06.xlsx (poziții „Ultima poziție la ADMITERE" 2020-2025), toate specializările cu poziție validă în ambii ani ai tranziției.
// n variază pe tranziție (specializări noi/eliminate/fără poziție înregistrată în unul din ani).
// bias = poziție(an_N) − poziție(an_N−1); pozitiv = poziția a crescut (loc de ultimă admitere mai „adânc").
// over = % specializări cu |eroare| > 250 locuri. Recalculat independent, verificat MAE/mediană identic cu raportul de audit inițial (top50 vechi era nereproductibil sub 5 interpretări testate — vezi raport).
const VALID = [
  { t: "2024→2025", n: 325, mae: 329, med: 200, bias: -132, over: 40, nota: "an tipic (fără eveniment extern cunoscut)" },
  { t: "2023→2024", n: 306, mae: 920, med: 778, bias: 892, over: 82, nota: "salt structural (cohortă/formulă)" },
  { t: "2022→2023", n: 295, mae: 499, med: 288, bias: -409, over: 52, nota: "an tipic (fără eveniment extern cunoscut)" },
  { t: "2021→2022", n: 243, mae: 827, med: 383, bias: 181, over: 65, nota: "perioadă COVID" },
  { t: "2020→2021", n: 212, mae: 703, med: 347, bias: -153, over: 59, nota: "perioadă COVID" },
];
const CODMAP = {"0": "272", "1": "103", "2": "273", "3": "179", "4": "181", "5": "101", "6": "116", "7": "275", "8": "115", "9": "117", "10": "274", "11": "104", "12": "297", "13": "106", "14": "183", "15": "225", "16": "224", "17": "109", "18": "182", "19": "296", "20": "255", "21": "169", "22": "227", "23": "105", "24": "254", "25": "175", "26": "114", "27": "226", "28": "168", "29": "172", "30": "257", "31": "259", "32": "299", "33": "173", "34": "170", "35": "256", "36": "293", "37": "138", "38": "110", "39": "261", "40": "251", "41": "139", "42": "111", "43": "298", "44": "229", "45": "250", "46": "126", "47": "228", "48": "176", "49": "125", "50": "260", "51": "188", "52": "253", "53": "127", "54": "142", "55": "189", "56": "146", "57": "131", "58": "252", "59": "130", "60": "230", "61": "141", "62": "132", "63": "276", "64": "128", "66": "295", "67": "129", "68": "277", "69": "191", "70": "304", "71": "208", "72": "133", "73": "148", "74": "160", "75": "192", "76": "233", "77": "209", "78": "231", "80": "210", "81": "305", "82": "194", "83": "278", "85": "306", "86": "161", "87": "235", "88": "196", "89": "284", "90": "143", "91": "307", "94": "144", "99": "118", "100": "195", "101": "286", "102": "308", "103": "283", "104": "262", "105": "119", "106": "285", "107": "300", "110": "264", "112": "120", "113": "237", "114": "309", "115": "211", "116": "301", "117": "263", "118": "198", "119": "238", "120": "310", "121": "199", "124": "197", "125": "121", "129": "212", "130": "302", "131": "313", "132": "207", "133": "282", "134": "205", "135": "303", "136": "239", "137": "279", "140": "206", "141": "166", "142": "280", "143": "281", "144": "315", "145": "314", "146": "242", "148": "318", "149": "319", "150": "243", "151": "244", "155": "233", "157": "123", "158": "185", "159": "184", "160": "187", "161": "186", "162": "213", "163": "240", "164": "201", "165": "156", "166": "214", "167": "202", "168": "203", "169": "204", "170": "241", "171": "215", "173": "32", "174": "216", "175": "162", "177": "163", "180": "151", "181": "248", "182": "218", "183": "246", "184": "292", "185": "291", "186": "157", "187": "158", "188": "245", "189": "247", "190": "222", "191": "164", "192": "269", "193": "219", "195": "221", "196": "151", "197": "167", "198": "271", "200": "311", "201": "270", "203": "159", "204": "249", "206": "312", "207": "287", "208": "290", "209": "289", "212": "151", "213": "288", "214": "316", "215": "165", "218": "151", "222": "317", "233": "150", "238": "151", "243": "200"}; // cod oficial admitere (134/158 verificate din Coduri_licee; restul '—')
// Bandă PROPORȚIONALĂ cu poziția — RECALIBRAT (verificare independentă pe 2020-2025, panel Excel istoric):
// eroarea mediană reală e ~5,7% pe ani tipici (2022-25), nu 2,7-3% cum presupunea versiunea anterioară.
// Cap-urile vechi (80-400 / 200-900) limitau acoperirea reală la ~70% în loc de 92% promis — verificat, corectat.
// ===== BENZI DE POZIȚIE CALIBRATE PE ADÂNCIME ȘI PE TRACK (red team v3, runda 2) =====
// Sursă: distribuția shift-urilor relative de poziție (posY − posY-1)/posY-1, 5 tranziții 2020-2025,
// din LiceeB-2026_06.xlsx sheet 1 (360 rânduri, TOATE liceele — nu doar cele 49 inițiale).
// SPLIT PE TRACK: backtest separat a arătat Tehnic/Servicii/Resurse cu eroare de 3-5x mai mare decât
// Real/Umanist chiar la adâncime egală (MAE 0,91 vs 0,30 la poz>6000) — o bandă unică ascundea asta.
// Segmente cu <30 observații pentru un track (ex. Tehnic sub 6.000, Teoretic peste 14.000 — cazuri rare
// în practică) folosesc fallback pe banda COMBINATĂ a acelui segment, nu valori calculate pe eșantion mic.
// SEGMENT NOU 14.000-17.000: la calibrarea inițială, bucket-ul se oprea la 14.000 — au fost excluse din
// greșeală 130 de observații istorice reale (poziții până la 16.562). Acum incluse (n=111, dominant Tehnic).
// La coada extremă (14-17k), shift-ul relativ brut ieșea NEGATIV pe eșantion (artefact de plafon — spre
// coada ierarhiei, numărul total de candidați diferă de la an la an și comprimă mișcările) — am aplicat
// un prag local: banda de coadă nu poate fi mai îngustă decât segmentul imediat anterior (10-14k).
const TRACK_TEORETIC = new Set(["Real", "Umanist"]);
function trackOf(profil){ return TRACK_TEORETIC.has(profil) ? "TEORETIC" : "TEHNIC"; }
const POSBAND_TEORETIC = [[1000,0.116,0.306],[3000,0.043,0.154],[5000,0.056,0.165],[7000,0.075,0.179],[9000,0.091,0.267],[12000,0.015,0.145],[15500,0.015,0.154]];
const POSBAND_TEHNIC   = [[1000,0.116,0.306],[3000,0.043,0.154],[5000,0.057,0.165],[7000,0.073,0.174],[9000,0.099,0.243],[12000,0.147,0.252],[15500,0.147,0.252]];
function posBandPct(pos, idx, profil){
  const T = trackOf(profil) === "TEORETIC" ? POSBAND_TEORETIC : POSBAND_TEHNIC;
  if (pos <= T[0][0]) return T[0][idx];
  if (pos >= T[T.length-1][0]) return T[T.length-1][idx];
  for (let i=0;i<T.length-1;i++){
    const x0=T[i][0], x1=T[i+1][0];
    if (pos>=x0 && pos<=x1){ const f=(pos-x0)/(x1-x0); return T[i][idx]+(T[i+1][idx]-T[i][idx])*f; }
  }
  return T[T.length-1][idx];
}
const coreBand = (pos, profil) => Math.round(Math.max(100, posBandPct(pos,1,profil) * pos));
const safeBand = (pos, profil) => Math.round(Math.max(250, posBandPct(pos,2,profil) * pos));

// ===== CONVERSIE POZIȚIE → MEDIE, empirică (elimină tierDelta/areaOffset/regim) =====
// Sursă: Ierarhie_Bucuresti_EN2026.csv — rezultate EN2026 INIȚIALE (înainte de contestații), 15.643 candidați,
// autenticitate confirmată (identic cu comunicatul oficial ISMB). Rezultatele finale ies 8 iulie 2026 —
// fișa se completează abia 13-20 iulie, deci tabelul poate fi reactualizat înainte de a fi nevoie de el.
//
// RECONSTRUIT 1 iulie 2026, sesiune de audit — versiunea anterioară a acestui tabel conținea o eroare
// sistematică pe percentila 65,0%-91,5% (valorile din tabel erau MAI MARI decât media reală din CSV la
// aceeași poziție, crescător de la +0,05 până la +1,00 puncte; exemplu concret: la poz. 13.462/percentila
// 86,06% tabelul vechi dădea 6,25, media reală la acea poziție e 5,60). Eroarea nu era prinsă de verificările
// vechi (monotonie/valori lipsă/pas maxim), care testează coerența internă a tabelului, nu fidelitatea lui
// față de sursă. Tabelul de mai jos e reconstruit direct din poziția candidatului în CSV (nu re-eșantionat),
// verificat prin DOUĂ metode independente de indexare (round vs. ceil) — diferă în doar 5 din 201 puncte,
// cu ≤0,03 (zgomot de rotunjire), nu cu bias sistematic. Verificat: 0 inversări (15.422 medii valide),
// 0 valori lipsă, pas maxim 0,15 / mediu 0,027 pe percentila 0-90%.
// Peste percentila 98,587% nu există medii valide (221 candidați absenți la examen) — extrapolat plat la
// media minimă validă din tot fișierul (1,00); irelevant practic — cel mai „adânc" prag din DATA e la
// percentila ~86% (poz. 13.462/15.643).
const TOTAL_EN2026_B = 15643; // total candidați ierarhie EN2026 București — confirmat identic cu ISMB
const PCT_TABLE = [[0.0, 10.0], [0.5, 9.85], [1.0, 9.8], [1.5, 9.75], [2.0, 9.72], [2.5, 9.7], [3.0, 9.67], [3.5, 9.65], [4.0, 9.62], [4.5, 9.6], [5.0, 9.6], [5.5, 9.57], [6.0, 9.55], [6.5, 9.53], [7.0, 9.52], [7.5, 9.5], [8.0, 9.47], [8.5, 9.47], [9.0, 9.45], [9.5, 9.42], [10.0, 9.42], [10.5, 9.4], [11.0, 9.4], [11.5, 9.37], [12.0, 9.36], [12.5, 9.35], [13.0, 9.32], [13.5, 9.32], [14.0, 9.3], [14.5, 9.3], [15.0, 9.27], [15.5, 9.25], [16.0, 9.25], [16.5, 9.22], [17.0, 9.22], [17.5, 9.2], [18.0, 9.2], [18.5, 9.17], [19.0, 9.17], [19.5, 9.15], [20.0, 9.12], [20.5, 9.12], [21.0, 9.1], [21.5, 9.1], [22.0, 9.07], [22.5, 9.05], [23.0, 9.05], [23.5, 9.02], [24.0, 9.02], [24.5, 9.0], [25.0, 9.0], [25.5, 8.97], [26.0, 8.95], [26.5, 8.95], [27.0, 8.92], [27.5, 8.9], [28.0, 8.9], [28.5, 8.87], [29.0, 8.87], [29.5, 8.85], [30.0, 8.82], [30.5, 8.82], [31.0, 8.8], [31.5, 8.8], [32.0, 8.77], [32.5, 8.75], [33.0, 8.75], [33.5, 8.72], [34.0, 8.7], [34.5, 8.68], [35.0, 8.67], [35.5, 8.65], [36.0, 8.62], [36.5, 8.62], [37.0, 8.6], [37.5, 8.57], [38.0, 8.57], [38.5, 8.55], [39.0, 8.52], [39.5, 8.5], [40.0, 8.5], [40.5, 8.47], [41.0, 8.45], [41.5, 8.42], [42.0, 8.4], [42.5, 8.4], [43.0, 8.37], [43.5, 8.35], [44.0, 8.32], [44.5, 8.3], [45.0, 8.3], [45.5, 8.27], [46.0, 8.25], [46.5, 8.22], [47.0, 8.2], [47.5, 8.17], [48.0, 8.15], [48.5, 8.15], [49.0, 8.12], [49.5, 8.1], [50.0, 8.07], [50.5, 8.05], [51.0, 8.02], [51.5, 8.0], [52.0, 7.97], [52.5, 7.95], [53.0, 7.92], [53.5, 7.9], [54.0, 7.87], [54.5, 7.85], [55.0, 7.82], [55.5, 7.8], [56.0, 7.77], [56.5, 7.75], [57.0, 7.72], [57.5, 7.7], [58.0, 7.67], [58.5, 7.65], [59.0, 7.6], [59.5, 7.57], [60.0, 7.55], [60.5, 7.52], [61.0, 7.5], [61.5, 7.47], [62.0, 7.42], [62.5, 7.4], [63.0, 7.37], [63.5, 7.35], [64.0, 7.32], [64.5, 7.3], [65.0, 7.25], [65.5, 7.22], [66.0, 7.2], [66.5, 7.15], [67.0, 7.12], [67.5, 7.1], [68.0, 7.07], [68.5, 7.02], [69.0, 6.97], [69.5, 6.95], [70.0, 6.9], [70.5, 6.87], [71.0, 6.85], [71.5, 6.8], [72.0, 6.77], [72.5, 6.72], [73.0, 6.7], [73.5, 6.67], [74.0, 6.62], [74.5, 6.6], [75.0, 6.55], [75.5, 6.52], [76.0, 6.47], [76.5, 6.45], [77.0, 6.42], [77.5, 6.37], [78.0, 6.35], [78.5, 6.3], [79.0, 6.27], [79.5, 6.22], [80.0, 6.17], [80.5, 6.12], [81.0, 6.07], [81.5, 6.05], [82.0, 6.0], [82.5, 5.95], [83.0, 5.92], [83.5, 5.87], [84.0, 5.8], [84.5, 5.75], [85.0, 5.7], [85.5, 5.65], [86.0, 5.6], [86.5, 5.55], [87.0, 5.5], [87.5, 5.45], [88.0, 5.37], [88.5, 5.32], [89.0, 5.27], [89.5, 5.2], [90.0, 5.12], [90.5, 5.05], [91.0, 4.95], [91.5, 4.9], [92.0, 4.82], [92.5, 4.75], [93.0, 4.67], [93.5, 4.57], [94.0, 4.5], [94.5, 4.4], [95.0, 4.25], [95.5, 4.15], [96.0, 3.97], [96.5, 3.8], [97.0, 3.52], [97.5, 3.27], [98.0, 2.95], [98.5, 2.12], [99.0, 1.0], [99.5, 1.0], [100.0, 1.0]];
function medieFromPercentila(p){ const pp = Math.max(0, Math.min(100, p)); for (let i=0;i<PCT_TABLE.length-1;i++){ const [p0,m0]=PCT_TABLE[i], [p1,m1]=PCT_TABLE[i+1]; if (pp>=p0 && pp<=p1){ if (p1===p0) return m0; const f=(pp-p0)/(p1-p0); return Math.round((m0+(m1-m0)*f)*100)/100; } } return PCT_TABLE[PCT_TABLE.length-1][1]; }
function medieFromPos(pos){ return medieFromPercentila(pos/TOTAL_EN2026_B*100); }
// ===== COADA IERARHIEI — praguri determinate de CERERE, nu de competiție (red team v3) =====
// Extinderea la toate cele 91 de licee a adus specializări cu pragul 2025 sub 5,00 (licee istoric NEUMPLUTE:
// ultimul admis e ultimul care a vrut, nu o barieră). Trei probleme, tratate onest, nu ascunse:
// (1) 18 specializări au poziția-prag 2025 (max 15.812, ierarhia de admitere) DINCOLO de ierarhia EN 2026
//     (15.643 total) — percentila >100%, clamped;
// (2) pozițiile 15.423-15.643 din CSV 2026 sunt candidați ABSENȚI (media 1,0 = marker, nu notă) — orice
//     „prag estimat" calculat acolo e contaminat;
// (3) persistența poziției presupune competiție la prag — invalid unde locurile depășesc cererea.
// Regulă: pentru specializările cu prag 2025 < 5,00 nu afișăm un prag 2026 fals-precis, ci „intrare liberă".
// Clasificarea pe POZIȚIE rămâne validă (poziția candidatului și pragul istoric sunt reale); benzile
// POSBAND/MBAND sunt calibrate pe segmente până la poz. 14.000 — peste, folosesc ultimul punct (clamp).
const PRAG_COADA = 5.00;
function esteCoada(r){ return r.m < PRAG_COADA; }
// Invers: din media candidatului, deduce percentila/poziția echivalentă (pentru banda istorică mai jos).
function percentilaFromMedie(m){ if (m >= PCT_TABLE[0][1]) return 0; for (let i=0;i<PCT_TABLE.length-1;i++){ const [p0,m0]=PCT_TABLE[i], [p1,m1]=PCT_TABLE[i+1]; if (m<=m0 && m>=m1){ if (m0===m1) return p0; const f=(m0-m)/(m0-m1); return p0+(p1-p0)*f; } } return 100; }
function pozFromMedie(m){ return Math.round(percentilaFromMedie(m)/100*TOTAL_EN2026_B); }
function classifyPos(pos, poz, profil){ const margin = pos - poz; const cb = coreBand(pos, profil), sb = safeBand(pos, profil); if (margin >= sb) return "sigur"; if (margin >= cb) return "probabil"; if (margin >= -cb) return "incert"; return "improb"; }

// ===== BENZI DE INCERTITUDINE PE MEDIE — CALIBRATE PE ADÂNCIME ȘI PE TRACK (red team v3, runda 2) =====
// Aceeași sursă și aceeași descoperire ca la POSBAND: Tehnic/Servicii/Resurse are eroare de câteva ori mai
// mare decât Real/Umanist la adâncime egală (MAE 0,88 vs 0,17 per total). Segment nou 14.000-17.000 adăugat
// (n=111, exclus anterior dintr-o eroare de bucket la 14.000). Fallback pe banda combinată unde un track
// are <30 observații într-un segment (Tehnic sub 6.000; Teoretic peste 14.000 — azi 0 cazuri reale acolo).
const MBAND_TEORETIC = [[1000,0.038,0.099],[3000,0.03,0.098],[5000,0.05,0.177],[7000,0.109,0.32],[9000,0.191,0.795],[12000,0.283,0.92],[15500,1.119,2.67]];
const MBAND_TEHNIC   = [[1000,0.038,0.099],[3000,0.03,0.098],[5000,0.05,0.181],[7000,0.10,0.30],[9000,0.201,0.939],[12000,0.735,1.895],[15500,1.119,2.508]];
function medieBands(pos, profil){
  const T = trackOf(profil) === "TEORETIC" ? MBAND_TEORETIC : MBAND_TEHNIC;
  if (pos <= T[0][0]) return { b50: T[0][1], b90: T[0][2] };
  if (pos >= T[T.length-1][0]) { const l = T[T.length-1]; return { b50: l[1], b90: l[2] }; }
  for (let i=0;i<T.length-1;i++){
    const [x0,a0,c0]=T[i],[x1,a1,c1]=T[i+1];
    if (pos>=x0 && pos<=x1){ const f=(pos-x0)/(x1-x0); return { b50: a0+(a1-a0)*f, b90: c0+(c1-c0)*f }; }
  }
  const l=T[T.length-1]; return { b50: l[1], b90: l[2] };
}
// Aceeași structură ca classifyPos (sigur ≥ banda mare; probabil ≥ banda mică; incert ≥ −banda mică):
function classifyMedie(pos, media, profil){ const prag = medieFromPos(pos); const m = media - prag; const { b50, b90 } = medieBands(pos, profil); if (m >= b90) return "sigur"; if (m >= b50) return "probabil"; if (m >= -b50) return "incert"; return "improb"; }

// ===== CORECȚIE IERARHIE v1→v3 — informativă, NEAPLICATĂ în prag =====
// PCT_TABLE e construit pe ierarhia EN înainte de contestații (v1). Pragul real de admitere trăiește în
// ierarhia de la înscriere (v3): −candidați B care nu se înscriu la admitere, +~2.500 din alte județe.
// Diferența medie(v3)−medie(v1) la poziție fixă, măsurată pe 2024 (singurul an cu ambele ierarhii în sursă):
// crescătoare cu adâncimea, de la −0,04 (poz. 501) la −0,52 (poz. 12.501). Direcție: pragul REAL tinde să fie
// MAI MIC decât estimarea v1 → estimarea actuală e conservatoare (în favoarea siguranței candidatului).
// NU aplicăm corecția în prag (un singur an de date, iar 2026 e atipic: cohortă −10,7%, locuri +8,8%);
// o afișăm ca scenariu secundar în panoul detaliat.
const CORR_V1V3 = [[501,-0.04],[1001,-0.06],[2001,-0.09],[3001,-0.15],[4001,-0.22],[6001,-0.32],[8001,-0.40],[10001,-0.47],[12501,-0.52]];
function corectieV1V3(pos){
  const T = CORR_V1V3;
  if (pos <= T[0][0]) return T[0][1];
  if (pos >= T[T.length-1][0]) return T[T.length-1][1];
  for (let i=0;i<T.length-1;i++){
    const [x0,y0]=T[i],[x1,y1]=T[i+1];
    if (pos>=x0 && pos<=x1) return y0+(y1-y0)*(pos-x0)/(x1-x0);
  }
  return T[T.length-1][1];
}

// ===== INDICATOR ISTORIC (NU o probabilitate calibrată) =====
// Sursă: LiceeB-2026_06.xlsx, 357 specializări, pozițiile "Ultima poziție la ADMITERE" 2020-2025.
// Pentru fiecare din cele 5 tranziții reale și pentru o grilă de marje proporționale (marjă/poziție prag),
// calculează ce % din specializări au rămas efectiv sub prag anul următor. Arătat PE FIECARE AN separat,
// nu doar media (pooled), pentru că varianța reală e enormă: la marjă 6%, acoperirea a fost 17,0% în
// 2023→2024 (an cu salt structural) și 93,9-93,8% în 2022→2023 și 2024→2025 (ani tipici) — diferență de
// 77 puncte procentuale pentru "aceeași" marjă. O singură cifră "% șansă" ar ascunde exact această
// instabilitate — de-asta nu există un singur număr, ci un interval pe an + media pe toate.
const HIST_YEARS = ["2020→21", "2021→22", "2022→23", "2023→24*", "2024→25"]; // * = salt structural (cohortă/formulă)
// Grilă extinsă și pe marje NEGATIVE (candidat sub prag) — nu doar pozitive. O marjă negativă tăiată la 0
// ar fi arătat fals de optimist pentru cazurile IMPROBABIL (candidatul chiar sub linia de anul trecut).
const HIST_TABLE = [
  [-30, [2, 1, 0, 0, 1],     1],
  [-20, [8, 5, 1, 0, 3],     3],
  [-13, [18, 8, 3, 1, 6],    7],
  [-8,  [28, 31, 23, 2, 10], 17],
  [-4,  [39, 48, 50, 4, 24], 32],
  [-2,  [47, 60, 62, 6, 37], 41],
  [0,   [56, 69, 75, 8, 60], 53],
  [2,   [66, 72, 85, 10, 78], 61],
  [4,   [73, 74, 91, 13, 88], 67],
  [6,   [78, 76, 94, 17, 94], 71],
  [8,   [82, 79, 96, 27, 96], 75],
  [10,  [85, 79, 96, 43, 96], 80],
  [13,  [90, 82, 96, 64, 97], 86],
  [17,  [91, 87, 97, 87, 98], 92],
  [20,  [93, 88, 97, 95, 99], 95],
  [25,  [95, 92, 99, 98, 99], 97],
  [30,  [97, 97, 99, 99, 99], 98],
  [40,  [99, 100, 99, 100, 99], 99],
  [50,  [100, 100, 99, 100, 99], 99],
];
function istoricLaMarja(marjaProc) {
  const mp = marjaProc * 100; // NU mai truncăm la 0 — marja negativă (sub prag) trebuie să scadă real
  const T = HIST_TABLE;
  if (mp <= T[0][0]) return { ani: T[0][1], pooled: T[0][2] };
  if (mp >= T[T.length - 1][0]) { const last = T[T.length - 1]; return { ani: last[1], pooled: last[2] }; }
  for (let i = 0; i < T.length - 1; i++) {
    const [m0, a0, p0] = T[i], [m1, a1, p1] = T[i + 1];
    if (mp >= m0 && mp <= m1) {
      const f = (mp - m0) / (m1 - m0);
      const ani = a0.map((v, idx) => Math.round(v + (a1[idx] - v) * f));
      const pooled = Math.round(p0 + (p1 - p0) * f);
      return { ani, pooled };
    }
  }
  return { ani: T[T.length - 1][1], pooled: T[T.length - 1][2] };
}

const fmt = (v) => (v == null ? "—" : v.toFixed(2).replace(".", ","));
const fi = (v) => v == null ? "—" : Math.round(v).toLocaleString("ro-RO");

// ===== ISTORIC INFORMATIV: ce medie a fost la o poziție dată, pe ani (BUCUREȘTI) =====
// Surse: 2021-2025 = tabelele oficiale notă→poziție + poziție→notă din LiceeB-2026_06.xlsx, sheet Statistici,
// ierarhia EN DUPĂ contestații (v2). 2020 = reconstruit din perechile (poziție, medie prag) ale specializărilor
// (ierarhia de ADMITERE — altă bază de numărare, marcat distinct). 2026 = CSV oficial EN, ÎNAINTE de contestații (v1).
// Bazele diferă ușor între ani (v1/v2/v-admitere) — comparabil informativ, nu identic metodologic.
const POS_MEDIE_ANI = {"2020":[[192,9.98],[411,9.9],[1115,9.76],[2032,9.59],[3019,9.43],[3987,9.25],[4991,9.06],[6020,8.83],[7981,8.35],[10025,7.73],[11483,7.11]],"2021":[[8,10.0],[439,9.75],[500,9.72],[1000,9.59],[1325,9.5],[2000,9.33],[2343,9.25],[3000,9.07],[3269,9.0],[4000,8.77],[4807,8.5],[5000,8.42],[6000,8.03],[6079,8.0],[8000,7.17],[8212,7.0],[9855,6.0],[10000,5.89],[11085,5.0],[12500,2.92]],"2022":[[21,10.0],[500,9.8],[821,9.75],[1000,9.71],[2000,9.51],[2089,9.5],[3000,9.34],[3524,9.25],[4000,9.16],[4850,9.0],[5000,8.96],[6000,8.75],[7089,8.5],[8000,8.24],[8767,8.0],[10000,7.56],[11490,7.0],[12500,6.56],[13596,6.0],[14801,5.0],[15000,4.73]],"2023":[[104,10.0],[500,9.85],[1000,9.75],[2000,9.52],[2232,9.5],[3000,9.32],[3526,9.25],[4000,9.15],[4778,9.0],[5000,8.93],[6000,8.7],[6912,8.5],[8000,8.17],[8601,8.0],[10000,7.37],[10726,7.0],[12236,6.0],[12500,5.8],[13481,5.0],[15000,1.0]],"2024":[[32,10.0],[500,9.8],[702,9.75],[1000,9.67],[1817,9.5],[2000,9.45],[2970,9.25],[3000,9.22],[4000,9.02],[4102,9.0],[5000,8.77],[6000,8.52],[6131,8.5],[7916,8.0],[8000,7.95],[10000,7.27],[10721,7.0],[12500,6.22],[12966,6.0],[14640,5.0],[15000,4.67]],"2025":[[33,10.0],[500,9.77],[695,9.75],[1000,9.67],[2000,9.5],[3000,9.32],[3596,9.25],[4000,9.17],[5000,9.0],[6000,8.82],[7675,8.5],[8000,8.42],[9736,8.0],[10000,7.9],[12500,7.1],[12820,7.0],[14963,6.0],[15000,5.97],[16275,5.0]],"2026":[[100,9.82],[500,9.67],[1000,9.55],[2000,9.35],[3000,9.15],[4000,8.97],[5000,8.77],[6000,8.55],[8000,8.02],[10000,7.32],[12500,6.17],[15000,4.02]]};
const ANI_ETICHETE = { 2020: "2020ᴬ", 2021: "2021", 2022: "2022", 2023: "2023", 2024: "2024", 2025: "2025", 2026: "2026ᴵ" };
function medieAnLaPozitia(an, pos) {
  const c = POS_MEDIE_ANI[String(an)];
  if (!c) return null;
  if (pos < c[0][0]) return c[0][1];               // deasupra primului punct: clamp la valoarea de top
  if (pos > c[c.length - 1][0]) return null;        // dincolo de ultimul punct real: nu extrapolăm
  for (let i = 0; i < c.length - 1; i++) {
    const [x0, y0] = c[i], [x1, y1] = c[i + 1];
    if (pos >= x0 && pos <= x1) { if (x1 === x0) return y0; return Math.round((y0 + (y1 - y0) * (pos - x0) / (x1 - x0)) * 100) / 100; }
  }
  return null;
}
// ===== REPARTIȚIA PE REGIUNI (B / Ilfov / restul țării) — DOAR 2022 și 2025 =====
// Sursă: baza de date SIIIR (istoric_evaluare_nationala) — coloana judet e populată NUMAI pentru 2022 și 2025;
// pentru ceilalți ani nu există nicio cale de atribuire pe județ în schema actuală (verificat: localitate_sup
// e NULL, iar tabelul unităților școlare nu are coloană de județ). Nu inventăm — afișăm doar ce e verificabil.
// Verificare externă: totalul B 2022 (15.428 medii valide) = EXACT numărul oficial de candidați prezenți din
// statistica ISMB. Format: [banda_de_medie, cumulat≥banda în B, în IF, în restul țării].
const REG_TOTALURI = { 2022: { B: 15428, IF: 3011, REST: 130057 }, 2025: { B: 16949, IF: 3375, REST: 131811 } };
const REG_CUM = {"2022": [[1.0,15428,3011,130057],[1.5,15427,3011,129984],[2.0,15419,3007,129602],[2.5,15388,2986,128509],[3.0,15310,2948,126655],[3.5,15198,2880,123888],[4.0,14989,2764,119773],[4.5,14657,2612,113806],[5.0,14147,2374,105780],[5.5,13465,2092,95967],[6.0,12577,1800,85287],[6.5,11566,1525,73930],[7.0,10415,1248,62819],[7.5,9185,976,51809],[8.0,7873,735,40859],[8.5,6243,492,29407],[9.0,4180,263,17524],[9.5,1772,75,6137],[10.0,39,2,196]], "2025": [[1.0,16949,3375,131811],[1.5,16947,3375,131757],[2.0,16943,3374,131450],[2.5,16917,3358,130414],[3.0,16863,3320,128396],[3.5,16763,3245,125303],[4.0,16593,3124,120932],[4.5,16319,2963,115238],[5.0,15939,2759,107851],[5.5,15386,2516,98998],[6.0,14640,2191,89505],[6.5,13709,1927,79168],[7.0,12543,1608,68281],[7.5,11176,1313,56349],[8.0,9537,1005,44057],[8.5,7529,675,30951],[9.0,5032,341,17280],[9.5,1994,93,5255],[10.0,33,2,50]]};
function cumRegLaMedia(an, m) {
  const T = REG_CUM[String(an)];
  if (!T || m == null) return null;
  if (m <= T[0][0]) return { B: T[0][1], IF: T[0][2], REST: T[0][3] };
  const last = T[T.length - 1];
  if (m >= last[0]) return { B: last[1], IF: last[2], REST: last[3] };
  for (let i = 0; i < T.length - 1; i++) {
    const [b0, B0, I0, R0] = T[i], [b1, B1, I1, R1] = T[i + 1];
    if (m >= b0 && m <= b1) {
      const f = (m - b0) / (b1 - b0);
      return { B: Math.round(B0 + (B1 - B0) * f), IF: Math.round(I0 + (I1 - I0) * f), REST: Math.round(R0 + (R1 - R0) * f) };
    }
  }
  return null;
}

// ===== DISTANȚĂ / TIMP PE JOS — estimare, NU rută reală =====
// Coordonate geocodate o singură dată (Google Places, 1 iulie 2026) pentru toate cele 49 de licee din DATA,
// verificate prin adresa exactă din LiceeB-2026_06.xlsx (nu doar căutare pe nume — la "Ștefan Demetrescu",
// căutarea pe nume dădea o clădire greșită; corectat folosind adresa "Șos. Vitan-Bârzești 11").
const SCHOOL_COORDS = {
  "Gheorghe Lazăr": [44.4347862, 26.0903612], "Sfântul Sava": [44.4415981, 26.0908164],
  "Spiru Haret": [44.4381821, 26.1072193], "Tudor Vianu": [44.4580628, 26.080109],
  "Grigore Moisil": [44.4266085, 26.0411891], "I.L.Caragiale": [44.4584563, 26.095119],
  "Matei Basarab": [44.4302782, 26.1134749], "Gheorghe Șincai": [44.4140656, 26.1039555],
  "Mihai Viteazul": [44.4394141, 26.1251258], "Iulia Hașdeu": [44.4435528, 26.1278131],
  "Cantemir Vodă": [44.4454576, 26.1128451], "Ion Creangă": [44.4234749, 26.1062867],
  "Elena Cuza": [44.4175821, 26.0248277], "Nicolae Iorga": [44.4648995, 26.0702885],
  "Mihai Eminescu": [44.4258139, 26.0956462], "Alexandru Ioan Cuza": [44.4277469, 26.1699278],
  "Ion Neculce": [44.4548067, 26.0731191], "Școala Centrală": [44.4431308, 26.1055284],
  "Miguel de Cervantes": [44.4368927, 26.0839249], "Jean Monnet": [44.4659244, 26.0933393],
  "Ion Barbu": [44.4208696, 26.0612125], "Goethe": [44.4498574, 26.0977432],
  "Tudor Vladimirescu": [44.4337104, 26.0424993], "C.A. Rosetti": [44.4671542, 26.1062542],
  "George Călinescu": [44.4448492, 26.0947447], "Dante Alighieri": [44.417234, 26.15954],
  "V. Madgearu": [44.4464637, 26.1007043], "Emil Racoviță": [44.4356464, 26.1383752],
  "Victor Babeș": [44.4628828, 26.159382], "Ștefan Odobleja": [44.4177934, 26.062478],
  "Alexandru Vlahuță": [44.4582299, 26.0974989], "Nicolae Kretzulescu": [44.4333111, 26.1089195],
  "Ștefan Demetrescu": [44.3922258, 26.1430098], "C-tin Brâncoveanu": [44.48272, 26.049803],
  "Aurel Vlaicu": [44.4659756, 26.0583362], "Eugen Lovinescu": [44.4155386, 26.028239],
  "Octav Onicescu": [44.3863446, 26.1145757], "Marin Preda": [44.459576, 26.0419663],
  "Sfântul Iosif": [44.4011827, 26.1013426], "Benjamin Franklin": [44.4295661, 26.1524015],
  "Ita Wegman": [44.479883, 26.1081425], "A.D.Xenopol": [44.4381774, 26.1202664],
  "Petru Maior": [44.4289014, 26.050425], "Mihail Sadoveanu": [44.4459802, 26.1324915],
  "Dimitrie Bolintineanu": [44.4089815, 26.0693528], "Costin C. Kirițescu": [44.4358686, 26.0313955],
  "Ioan N. Socolescu": [44.4468228, 26.0838666], "Decebal": [44.4080216, 26.1467582],
  "Mircea Eliade": [44.4445961, 26.0499989],
  // +42 licee adăugate 3 iulie 2026 — extindere la toate liceele din București (nu doar cele 49 inițiale)
  "Ady Endre": [44.4430468, 26.1267432], "Anghel Saligny": [44.4321427, 26.1601253],
  "Carol I": [44.4567477, 26.0518388], "Constantin Brâncuși": [44.4787577, 26.1078082],
  "Costin D. Nenițescu": [44.4097295, 26.1757361], "Dacia": [44.3802873, 26.1427913],
  "Dimitrie Gusti": [44.4181024, 26.0694626], "Dimitrie Leonida": [44.4339551, 26.1550666],
  "Dimitrie Paciurea": [44.4841423, 26.0633983], "Dinicu Golescu": [44.4527813, 26.0583631],
  "Dragomir Hurmuzescu": [44.431758, 26.1910844], "Dumitru Moțoc": [44.4103044, 26.0813621],
  "Edmond Nicolau": [44.4792759, 26.1083809], "Elie Radu": [44.4086914, 26.1438617],
  "Energetic": [44.3877029, 26.0904548], "George Coșbuc": [44.4400071, 26.1184244],
  "Gheorghe Airinei": [44.4201476, 26.0243531], "Gheorghe Asachi": [44.4249913, 26.0368524],
  "Grigore Cerchez": [44.4061518, 26.0953191], "Henri Coandă": [44.4931367, 26.0929914],
  "Hermes": [44.4365607, 26.1138166], "Hristo Botev": [44.4456784, 26.08443],
  "Ion I.C. Brătianu": [44.4463233, 26.1321506], "Iuliu Maniu": [44.4348059, 25.975202],
  "Lucian Blaga": [44.4416377, 26.1805774], "Media": [44.4854333, 26.0592268],
  "Mihai Bravu": [44.4192931, 26.1353658], "Mihai I": [44.4665142, 26.0420816],
  "Mircea cel Bătrân": [44.4661433, 26.057437], "Nichita Stănescu": [44.4334684, 26.1695913],
  "Nikola Tesla": [44.4481942, 26.135441], "Nr. 1": [44.3850084, 26.1070786],
  "Petru Poni": [44.4322502, 25.9903452], "Sf. Antim Ivireanu": [44.424346, 26.0289612],
  "Sfântul Pantelimon": [44.4404536, 26.1531246], "Theodor Pallady": [44.4055483, 26.2036784],
  "Timotei Cipariu": [44.4751712, 26.0518203], "Traian": [44.4609392, 26.1130543],
  "Traian Vuia": [44.3925759, 26.1453829], "Valter Mărăcineanu": [44.4674974, 26.0525843],
  "Viaceslav Harnaj": [44.4905193, 26.0855316], "Viilor": [44.4130227, 26.086386],
};
// Punct de plecare implicit: Șos. București-Târgoviște 46 (geocodat 1 iulie 2026). Notă: codul poștal
// (075100) e Chitila/Mogoșoaia, în Ilfov, nu într-un sector al Bucureștiului propriu-zis — nu schimbă
// calculul de distanță, dar e relevant dacă te încurcă etichetarea "sector" de mai jos (nu se aplică aici).
const HOME_DEFAULT = { lat: 44.5140553, lon: 26.0177686, label: "Șos. București-Târgoviște 46" };
function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371, toRad = (d) => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1), dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
// Estimare timp pe jos din distanța în linie dreaptă: viteză ~4,5 km/h, ×1,3 corecție rețea stradală
// (o rută reală pe stradă e mai lungă decât linia dreaptă). E o ESTIMARE declarată, nu o rută reală —
// pentru mijloace de transport în comun nu există echivalent onest fără date de linii/orare reale.
function estimeazaMinutePeJos(km) { return Math.round(km * 1.3 / 4.5 * 60); }

const PROFIL_COLORS = { Real: "#1a5276", Umanist: "#7d3c98", Tehnic: "#784212", Servicii: "#0E6E6E" };
const TIP_SHORT = { "Colegiul Național": "CN", "Liceul Teoretic": "LT", "Colegiul Național Bilingv": "CNB", "Colegiul Național de Informatică": "CNI", "Liceul Teoretic Bilingv": "LTB", "Colegiul German": "CG", "Colegiul Economic": "CE", "Școala Superioară Comercială": "SSC", "Liceul Teologic Adventist": "LTA" };
const CLS = {
  sigur:   { lab: "SIGUR",      color: "#147a40", bg: "#dff0e6", bd: "#bfe0cb" },
  probabil:{ lab: "PROBABIL",   color: "#1e9e5a", bg: "#eafaf1", bd: "#cdeada" },
  incert:  { lab: "INCERT",     color: "#9a6b12", bg: "#FBF3E2", bd: "#E7D29A" },
  improb:  { lab: "IMPROBABIL", color: "#c0392b", bg: "#F3E5E0", bd: "#e8c3b8" },
};

export default function Simulator2026() {
  const [mod, setMod] = useState("pozitie");
  const [pozInput, setPozInput] = useState("3500");
  const [mediaInput, setMediaInput] = useState("9.20");
  const [filtruProfil, setFiltruProfil] = useState("Toate");
  const [filtruSectoare, setFiltruSectoare] = useState([]); // selecție multiplă; gol = toate sectoarele
  const toggleSector = (s) => setFiltruSectoare((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  const [filtruCls, setFiltruCls] = useState("toate");
  const [showValid, setShowValid] = useState(false);
  const [open, setOpen] = useState(null);
  const [selectate, setSelectate] = useState([]); // fișa mea de înscriere: array de r.i, în ordine
  const [urmarite, setUrmarite] = useState([]);   // licee de interes marcate — independent de fișă
  const [doarUrmarite, setDoarUrmarite] = useState(false);
  const [interesQuery, setInteresQuery] = useState("");
  const [home, setHome] = useState(HOME_DEFAULT);
  const [homeLabel, setHomeLabel] = useState(HOME_DEFAULT.label);
  const [sortDistanta, setSortDistanta] = useState(false);
  const [pozInfoInput, setPozInfoInput] = useState("3500");
  const [showIstoricPoz, setShowIstoricPoz] = useState(false);

  const poz = parseInt(String(pozInput).replace(/\D/g, "")) || 0;
  const media = (() => { const x = parseFloat(String(mediaInput).replace(",", ".")); return isNaN(x) ? -1 : x; })();

  const toggleSelect = (i) => setSelectate((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);
  const toggleUrmarit = (i) => setUrmarite((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);
  const normDiac = (s) => String(s ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const moveSel = (pos, dir) => setSelectate((prev) => { const arr = [...prev]; const j = pos + dir; if (j < 0 || j >= arr.length) return arr; [arr[pos], arr[j]] = [arr[j], arr[pos]]; return arr; });
  const removeSel = (i) => setSelectate((prev) => prev.filter((x) => x !== i));
  const escHtml = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const [showExport, setShowExport] = useState(false);
  const buildExport = () => {
    const rowsHtml = selectate.map((idx, pos) => {
      const r = DATA[idx]; const cod = CODMAP[String(idx)] || "—";
      const clsPoz = classifyPos(r.pos, poz, r.p); const clsMedie = classifyMedie(r.pos, media, r.p); const pragMedie = medieFromPos(r.pos);
      const marjaProc = r.pos > 0 ? (r.pos - pozEchivalent) / r.pos : 0;
      const ist = istoricLaMarja(marjaProc);
      return `<tr><td>${pos + 1}</td><td>${escHtml(cod)}</td><td>${escHtml(r.n)}</td><td>${escHtml(r.p)}</td><td>${escHtml(r.s)}${r.b ? " (" + escHtml(r.b) + ")" : ""}</td><td>${fmt(r.m)}</td><td>${esteCoada(r) ? "liber (<5,00 istoric)" : fmt(pragMedie) + " ±" + medieBands(r.pos, r.p).b50.toFixed(2).replace(".", ",")}</td><td>${fi(r.pos)}</td><td>${fi(r.pos)} *</td><td>${CLS[clsPoz].lab}</td><td>${CLS[clsMedie].lab}</td><td>~${ist.pooled}% **</td><td></td></tr>`;
    }).join("");
    const headHtml = ["Nr.", "Cod", "Liceu", "Profil", "Specializare", "Ultima medie 2025", "Media est. 2026", "Ultima poz. 2025", "Poz. est. 2026", "Clasif. poz.", "Clasif. medie", "Istoric **", "Observații"].map((h) => `<th>${h}</th>`).join("");
    const html = `<!DOCTYPE html><html lang="ro"><head><meta charset="utf-8"><title>Fișa mea de înscriere — admitere 2026</title><style>
body{font-family:Georgia,'Times New Roman',serif;color:#16202b;padding:28px;max-width:980px;margin:0 auto}
h1{font-size:18px;margin:0 0 4px}
.meta{font-size:11px;color:#43505e;margin-bottom:16px;font-family:Arial,sans-serif}
table{width:100%;border-collapse:collapse;font-size:10.5px;font-family:Arial,sans-serif}
th{text-align:left;padding:4px 5px;border-bottom:2px solid #16202b}
td{padding:4px 5px;border-bottom:1px solid #7c8798}
.foot{font-size:9.5px;color:#43505e;margin-top:10px;font-family:Arial,sans-serif}
@media print{@page{margin:14mm}}
</style></head><body>
<h1>Fișa mea de înscriere — admitere 2026, București</h1>
<div class="meta">Generat din simulator · rang introdus: ${fi(poz)} · medie introdusă: ${fmt(media)} · conversie poziție→medie din distribuția reală EN2026 (inițială, înainte de contestații) · document informativ, nu oficial — confruntă cu broșura ISMB.</div>
<table><thead><tr>${headHtml}</tr></thead><tbody>${rowsHtml}</tbody></table>
<div class="foot">* „Poz. est. 2026" = ultima poziție 2025 (metoda actuală nu ajustează). ** „Istoric" = medie pe 5 tranziții reale 2020-2025 la marjă echivalentă, NU o probabilitate calibrată — acoperirea reală a variat 17%-97% după an (vezi simulatorul pentru detaliul pe an). Clasificarea de bază rămâne categorică. Document generat automat, verifică cu sursele oficiale (ISMB) înainte de a-l folosi la înscriere.</div>
<script>window.onload=function(){setTimeout(function(){window.print();},350);};</script>
</body></html>`;
    const tsvHead = ["Nr.", "Cod", "Liceu", "Profil", "Specializare", "Ultima medie 2025", "Media est. 2026 (±banda)", "Ultima poz. 2025", "Clasif. poz.", "Clasif. medie", "Istoric*"].join("\t");
    const tsvRows = selectate.map((idx, pos) => {
      const r = DATA[idx]; const cod = CODMAP[String(idx)] || "—";
      const clsPoz = classifyPos(r.pos, poz, r.p); const clsMedie = classifyMedie(r.pos, media, r.p); const pragMedie = medieFromPos(r.pos);
      const { b50 } = medieBands(r.pos, r.p);
      const ist = istoricLaMarja(r.pos > 0 ? (r.pos - pozEchivalent) / r.pos : 0);
      return [pos + 1, cod, r.n, r.p, r.s + (r.b ? " (" + r.b + ")" : ""), fmt(r.m), esteCoada(r) ? "liber (<5,00 istoric)" : fmt(pragMedie) + " ±" + b50.toFixed(2).replace(".", ","), fi(r.pos), CLS[clsPoz].lab, CLS[clsMedie].lab, "~" + ist.pooled + "%"].join("\t");
    }).join("\n");
    return { html, tsv: tsvHead + "\n" + tsvRows };
  };
  const handleExport = () => setShowExport(true);
  const tryDownload = () => {
    const { html } = buildExport();
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "Fisa_inscriere_2026.html";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };
  const copyTsv = async () => {
    const { tsv } = buildExport();
    try { await navigator.clipboard.writeText(tsv); alert("Copiat — lipește în Excel/Word (Ctrl+V)."); }
    catch (e) { alert("Clipboard blocat de browser — selectează textul din casetă și copiază manual (Ctrl+C)."); }
  };
  const copyHtml = async () => {
    const { html } = buildExport();
    try { await navigator.clipboard.writeText(html); alert("HTML copiat — salvează-l ca Fisa_inscriere_2026.html și deschide-l în browser pentru tipărire."); }
    catch (e) { alert("Clipboard blocat de browser — folosește caseta de text."); }
  };

  const pozEchivalent = useMemo(() => mod === "medie" ? pozFromMedie(media) : poz, [mod, poz, media]);

  const rows = useMemo(() => DATA.map((r, i) => {
    let cls, cutoff, margin;
    if (mod === "pozitie") {
      cutoff = r.pos; margin = cutoff - poz;            // pozitiv = ești peste prag (mai sigur)
      const cb = coreBand(cutoff, r.p), sb = safeBand(cutoff, r.p);
      if (margin >= sb) cls = "sigur";
      else if (margin >= cb) cls = "probabil";
      else if (margin >= -cb) cls = "incert";
      else cls = "improb";
    } else {
      const prag = medieFromPos(r.pos); cutoff = prag;
      const m = media - prag;
      if (m >= 0.11) cls = "sigur"; else if (m >= 0) cls = "probabil"; else if (m >= -0.11) cls = "incert"; else cls = "improb";
      margin = m;
    }
    // marjă proporțională echivalentă (pos - poz)/pos — aceeași scală în ambele moduri, folosită pt. indicatorul istoric
    const marjaProc = r.pos > 0 ? (r.pos - pozEchivalent) / r.pos : 0;
    const ist = istoricLaMarja(marjaProc);
    const coord = SCHOOL_COORDS[r.n];
    const distKm = coord ? haversineKm(home.lat, home.lon, coord[0], coord[1]) : null;
    const walkMin = distKm != null ? estimeazaMinutePeJos(distKm) : null;
    return { ...r, i, cls, cutoff, margin, marjaProc, ist, distKm, walkMin };
  }), [mod, poz, media, pozEchivalent, home]);

  const fisaRows = selectate.map((i) => {
    const r = DATA[i];
    const clsPoz = classifyPos(r.pos, poz, r.p);
    const pragMedie = medieFromPos(r.pos);
    const clsMedie = classifyMedie(r.pos, media, r.p);
    const cod = CODMAP[String(i)] || null;
    const marjaProc = r.pos > 0 ? (r.pos - pozEchivalent) / r.pos : 0;
    const ist = istoricLaMarja(marjaProc);
    return { ...r, i, cod, clsPoz, pragMedie, clsMedie, ist };
  });

  const cnt = { sigur: 0, probabil: 0, incert: 0, improb: 0 };
  rows.forEach((r) => cnt[r.cls]++);
  const profiluri = ["Toate", "Real", "Umanist", "Tehnic", "Servicii", "Resurse naturale si Protecția mediului"];
  const sectoare = ["Toate", "S1", "S2", "S3", "S4", "S5", "S6"];
  let shown = rows;
  if (filtruProfil !== "Toate") shown = shown.filter((r) => r.p === filtruProfil);
  if (filtruSectoare.length > 0) shown = shown.filter((r) => filtruSectoare.includes(r.sec));
  if (filtruCls !== "toate") shown = shown.filter((r) => r.cls === filtruCls);
  if (interesQuery.trim()) { const q = normDiac(interesQuery); shown = shown.filter((r) => normDiac(r.n).includes(q) || normDiac(r.s).includes(q)); }
  if (doarUrmarite) shown = shown.filter((r) => urmarite.includes(r.i));
  if (sortDistanta) shown = [...shown].sort((a, b) => (a.distKm ?? 999) - (b.distKm ?? 999));

  const F = "'Inter', system-ui, sans-serif", M = "'IBM Plex Mono', ui-monospace, monospace";
  const ACC = mod === "pozitie" ? "#0E6E6E" : "#1a5276";

  return (
    <div style={{ fontFamily: F, background: "#eef0f3", minHeight: "100vh", color: "#16202b" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Spectral:wght@600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');.snl-btn{cursor:pointer;transition:.12s}.snl-row:hover{box-shadow:0 2px 8px rgba(0,0,0,.07)}`}</style>

      <div style={{ background: "#141a2a", color: "#fff", padding: "22px 24px 16px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#a8b6d9" }}>București · Admitere 2026 · instrument de decizie</div>
          <h1 style={{ margin: "6px 0 0", fontSize: 24, fontWeight: 700, fontFamily: "'Spectral',serif", letterSpacing: "-.01em" }}>Simulator decizie 2026 — fără examene de limbă, validat pe 5 ani</h1>
          <div style={{ fontSize: 12, color: "#a8b6d9", marginTop: 6 }}>Folosește rangul tău din ierarhia ISMB (cunoscut la completarea fișei). <b style={{ color: "#cdd6f4" }}>Citește mai întâi caseta de validare.</b></div>
        </div>
      </div>

      {/* CASETA DE VALIDARE — onestă */}
      <div style={{ background: "#1d2740", color: "#cdd6f4", borderBottom: "1px solid #2a3754" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "12px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ fontSize: 12.5, lineHeight: 1.5, maxWidth: 760 }}>
              <b style={{ color: "#f1c40f" }}>Cât te poți baza:</b> ordinea liceelor <b>foarte depărtate</b> e stabilă, dar a celor <b>apropiate nu</b> — la specializări la ≤150 locuri distanță, ordinea se inversează în ~42% din cazuri de la un an la altul (verificat pe 2020-25; ~32% cum se credea inițial era subestimat). Deci nu te baza pe ordinea fină între vecini. Verdictul intri/nu intri: în ani tipici eroarea mediană e ~5,7% din poziție (~336 locuri median, 2022-25), dar aproape jumătate din cazuri se mișcă mai mult; în ani atipici (COVID, salt structural) mult mai mult. Banda e proporțională cu poziția. Am exclus cele 24 de specializări cu examen de limbă (la cererea ta); rămân 158 standard.
            </div>
            <button className="snl-btn" onClick={() => setShowValid(!showValid)} style={{ background: "transparent", color: "#5da9e9", border: "1px solid #2a3754", borderRadius: 6, padding: "6px 12px", fontSize: 12, fontWeight: 600 }}>{showValid ? "ascunde" : "vezi"} backtest 5 ani</button>
          </div>
          {showValid && (
            <div style={{ marginTop: 10, background: "#141a2a", borderRadius: 8, padding: "10px 12px", fontFamily: M, fontSize: 12 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.1fr .5fr .7fr .7fr .8fr .8fr 1.3fr", gap: 6, color: "#a8b6d9", paddingBottom: 6, borderBottom: "1px solid #2a3754" }}>
                <span>tranziție</span><span>n</span><span>MAE</span><span>median</span><span>bias</span><span>&gt;±250</span><span>observație</span>
              </div>
              {VALID.map((v, k) => (
                <div key={k} style={{ display: "grid", gridTemplateColumns: "1.1fr .5fr .7fr .7fr .8fr .8fr 1.3fr", gap: 6, padding: "5px 0", borderBottom: "1px solid #232f4a", color: v.nota.startsWith("an tipic") ? "#cdd6f4" : "#e8a87c" }}>
                  <span>{v.t}</span><span>{v.n}</span><span>{v.mae}</span><span>{v.med}</span><span>{v.bias > 0 ? "+" : ""}{v.bias}</span><span>{v.over}%</span><span style={{ fontFamily: F, fontSize: 11 }}>{v.nota}</span>
                </div>
              ))}
              <div style={{ color: "#a8b6d9", fontFamily: F, fontSize: 11, marginTop: 8 }}>Unități = locuri în ierarhia București. Panel complet (nu top50) — n variază 212-325 specializări/tranziție (specializări noi/eliminate diferă între ani). MAE variază de la 329 (2024→25) la 920 (2023→24, salt structural); bias alternează semn la fiecare tranziție — niciun an nu e stabil „tipic" din an în an. „&gt;±250" = % specializări cu eroare de poziție peste 250 locuri. Sursă: LiceeB-2026_06.xlsx, poziții „Ultima poziție la ADMITERE".</div>
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "18px 24px 56px" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
          {[["pozitie", "Pe poziție", "recomandat — rangul tău din ierarhie"], ["medie", "Pe medie", "dacă știi doar media — conversie din poziție"]].map(([k, t, d]) => (
            <button key={k} className="snl-btn" onClick={() => setMod(k)} style={{ flex: 1, textAlign: "left", padding: "11px 15px", borderRadius: 8, border: "2px solid " + (mod === k ? "#0E6E6E" : "#d7dae0"), background: mod === k ? "#e6f1f1" : "#fff", boxShadow: mod === k ? "0 0 0 3px #0E6E6E22" : "none" }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: mod === k ? "#0E6E6E" : "#43505e" }}>{t}</div>
              <div style={{ fontSize: 11.5, color: "#43505e", marginTop: 2 }}>{d}</div>
            </button>
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: 10, padding: "18px 22px", marginBottom: 14, boxShadow: "0 1px 4px rgba(0,0,0,.08)" }}>
          {mod === "pozitie" ? (
            <div>
              <div style={{ fontSize: 11, color: "#43505e", marginBottom: 6, fontWeight: 600, letterSpacing: 1 }}>POZIȚIA TA ÎN IERARHIA BUCUREȘTI 2026</div>
              <input type="text" inputMode="numeric" value={pozInput} onChange={(e) => setPozInput(e.target.value)} style={{ width: 140, fontFamily: M, fontSize: 30, fontWeight: 600, padding: "6px 12px", border: "2px solid #0E6E6E", borderRadius: 8, textAlign: "center", color: "#0E6E6E", outline: "none" }} />
              <div style={{ fontSize: 11.5, color: "#43505e", marginTop: 6 }}>numărul din ierarhia oficială ISMB (cu cât mai mic, cu atât mai sus). Pozițiile prag nu sunt ajustate cu numărul de locuri — backtestul a arătat că ajustarea adaugă bias.</div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: 11, color: "#43505e", marginBottom: 6, fontWeight: 600, letterSpacing: 1 }}>MEDIA TA LA EN 2026</div>
              <input type="number" min="1" max="10" step="0.01" value={mediaInput} onChange={(e) => setMediaInput(e.target.value)} style={{ width: 96, fontFamily: M, fontSize: 30, fontWeight: 600, padding: "6px 10px", border: "2px solid " + ACC, borderRadius: 8, textAlign: "center", color: ACC, outline: "none" }} />
              <div style={{ fontSize: 11.5, color: "#43505e", marginTop: 10, lineHeight: 1.5 }}>Conversia poziție → medie este calculată din distribuția reală EN 2026 (rezultatele disponibile la data curentă). Sunt rezultate <b>inițiale, înainte de contestații</b> — se actualizează după 8 iulie 2026. Banda de incertitudine e <b>calibrată pe adâncimea pragului</b> (backtest pe 5 ani, 1.266 predicții): ±0,03-0,05 la praguri de top, ±0,10 la mijloc, până la ±0,6 la praguri adânci. Metoda pe poziție rămâne mai stabilă decât cea pe medie.</div>
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
          {[["sigur", cnt.sigur], ["probabil", cnt.probabil], ["incert", cnt.incert], ["improb", cnt.improb]].map(([k, n]) => {
            const c = CLS[k], act = filtruCls === k;
            const sub = mod === "pozitie"
              ? (k === "sigur" ? "marjă robustă peste prag (~17%)" : k === "probabil" ? "peste prag, marjă mică" : k === "incert" ? "în zona coin-flip (~6%)" : "sub pragul de rang")
              : (k === "sigur" ? "peste prag + banda P90" : k === "probabil" ? "peste prag + banda P50" : k === "incert" ? "în ±banda P50" : "sub prag");
            return (
              <button key={k} className="snl-btn" onClick={() => setFiltruCls(act ? "toate" : k)} style={{ flex: "1 1 140px", textAlign: "left", border: "1px solid " + (act ? c.color : c.bd), background: act ? c.bg : "#fff", borderRadius: 8, padding: "9px 13px", boxShadow: act ? "inset 3px 0 0 " + c.color : "none" }}>
                <div style={{ fontFamily: M, fontSize: 22, fontWeight: 600, color: c.color }}>{n}</div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: c.color }}>{c.lab}</div>
                <div style={{ fontSize: 10.5, color: "#43505e", marginTop: 2 }}>{sub}</div>
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
          <div style={{ fontFamily: "'Spectral',serif", fontSize: 19, fontWeight: 600 }}>{shown.length} specializări{urmarite.length > 0 ? ` · ${urmarite.length} urmărite` : ""}</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {profiluri.map((p) => (
              <button key={p} className="snl-btn" onClick={() => setFiltruProfil(p)} style={{ padding: "5px 11px", borderRadius: 18, fontSize: 12, fontWeight: 600, border: "1px solid " + (filtruProfil === p ? "#16202b" : "#7c8798"), background: filtruProfil === p ? "#16202b" : "#fff", color: filtruProfil === p ? "#fff" : "#43505e" }}>{p}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14, alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "#43505e", fontWeight: 600, marginRight: 2 }}>SECTOARE (selecție multiplă)</span>
          {sectoare.map((s) => {
            const activ = s === "Toate" ? filtruSectoare.length === 0 : filtruSectoare.includes(s);
            return (
              <button key={s} className="snl-btn" onClick={() => s === "Toate" ? setFiltruSectoare([]) : toggleSector(s)} style={{ padding: "5px 11px", borderRadius: 18, fontSize: 12, fontWeight: 600, border: "1px solid " + (activ ? "#1a5276" : "#7c8798"), background: activ ? "#eaf1f8" : "#fff", color: activ ? "#1a5276" : "#43505e" }}>{s === "Toate" ? "Toate" : (activ ? "✓ " : "") + s}</button>
            );
          })}
          {filtruSectoare.length > 0 && <span style={{ fontSize: 10.5, color: "#43505e" }}>{filtruSectoare.length} selectate</span>}
        </div>

        <div style={{ background: "#fff", border: "1px solid #7c8798", borderRadius: 8, padding: "10px 14px", marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontSize: 11, color: "#43505e" }}>
              <b style={{ color: "#16202b" }}>Punct de plecare:</b> {homeLabel} <span style={{ fontFamily: M, color: "#9fb0c4" }}>({home.lat.toFixed(5)}, {home.lon.toFixed(5)})</span>
            </div>
            <button className="snl-btn" onClick={() => setSortDistanta(!sortDistanta)} style={{ border: "1px solid " + (sortDistanta ? "#1a5276" : "#7c8798"), background: sortDistanta ? "#eaf1f8" : "#fff", color: sortDistanta ? "#1a5276" : "#43505e", borderRadius: 6, padding: "5px 11px", fontSize: 11.5, fontWeight: 600 }}>{sortDistanta ? "✓ sortat după distanță" : "sortează după distanță"}</button>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap", alignItems: "center" }}>
            <input type="number" step="0.0001" value={home.lat} onChange={(e) => { const lat = parseFloat(e.target.value); if (!isNaN(lat)) { setHome((h) => ({ ...h, lat })); setHomeLabel("(coordonate editate manual)"); } }} style={{ width: 100, fontFamily: M, fontSize: 12, padding: "5px 8px", border: "1px solid #7c8798", borderRadius: 6 }} />
            <input type="number" step="0.0001" value={home.lon} onChange={(e) => { const lon = parseFloat(e.target.value); if (!isNaN(lon)) { setHome((h) => ({ ...h, lon })); setHomeLabel("(coordonate editate manual)"); } }} style={{ width: 100, fontFamily: M, fontSize: 12, padding: "5px 8px", border: "1px solid #7c8798", borderRadius: 6 }} />
            <span style={{ fontSize: 10.5, color: "#9fb0c4" }}>lat, lon — schimbă doar dacă vrei alt punct de plecare decât cel implicit</span>
          </div>
          <div style={{ fontSize: 10.5, color: "#43505e", marginTop: 6, lineHeight: 1.4 }}>Distanța de mai jos e în linie dreaptă, cu o estimare de timp pe jos (viteză ~4,5 km/h × 1,3 pentru rețeaua stradală) — NU e o rută reală. Nu există echivalent pentru mijloace de transport în comun fără date reale de linii/orare.</div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #7c8798", borderRadius: 8, padding: "10px 14px", marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, cursor: "pointer" }} onClick={() => setShowIstoricPoz(!showIstoricPoz)}>
            <div style={{ fontFamily: "'Spectral',serif", fontSize: 15, fontWeight: 600 }}>📊 Ce medie a fost la o poziție, pe ani (2020-2026) — informativ</div>
            <span style={{ fontSize: 12, color: "#43505e" }}>{showIstoricPoz ? "▲ ascunde" : "▼ arată"}</span>
          </div>
          {showIstoricPoz && (() => {
            const pInfo = parseInt(String(pozInfoInput).replace(/\D/g, "")) || 0;
            const ani = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
            const medii = ani.map((a) => ({ an: a, m: pInfo > 0 ? medieAnLaPozitia(a, pInfo) : null }));
            return (
              <div style={{ marginTop: 10 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
                  <label style={{ fontSize: 12, color: "#43505e", fontWeight: 600 }}>Poziția în ierarhie:</label>
                  <input type="text" inputMode="numeric" value={pozInfoInput} onChange={(e) => setPozInfoInput(e.target.value)} style={{ width: 90, fontFamily: M, fontSize: 13, padding: "6px 9px", border: "1px solid #7c8798", borderRadius: 6 }} />
                  <button className="snl-btn" onClick={() => setPozInfoInput(String(poz))} style={{ border: "1px solid #7c8798", background: "#fff", borderRadius: 6, padding: "6px 10px", fontSize: 11.5, color: "#43505e" }}>← preia poziția mea ({fi(poz)})</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, marginBottom: 6 }}>
                  {medii.map(({ an, m }) => (
                    <div key={an} style={{ textAlign: "center", background: an === 2026 ? "#eef3f8" : "#f6f7f4", border: "1px solid " + (an === 2026 ? "#bccde0" : "#e3e5e0"), borderRadius: 6, padding: "7px 4px" }}>
                      <div style={{ fontSize: 10.5, color: "#43505e" }}>{ANI_ETICHETE[an]}</div>
                      <div style={{ fontFamily: M, fontSize: 15, fontWeight: 700 }}>{m == null ? "—" : fmt(m)}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 10, color: "#43505e", lineHeight: 1.5, marginBottom: 12 }}>
                  Media candidatului aflat pe poziția {fi(pInfo)} în ierarhia București a fiecărui an. ᴬ 2020 = ierarhia de admitere (reconstruită din pragurile specializărilor — altă bază de numărare). 2021-2025 = ierarhia EN după contestații. ᴵ 2026 = EN înainte de contestații (finale pe 8 iulie). „—" = poziția depășește datele disponibile ale acelui an. Se vede clar deflația 2026: la aceeași poziție, medie mai mică decât în orice an din 2021 încoace.
                </div>
                {(() => {
                  const blocks = [2022, 2025].map((an) => {
                    const m = pInfo > 0 ? medieAnLaPozitia(an, pInfo) : null;
                    const c = m != null ? cumRegLaMedia(an, m) : null;
                    return { an, m, c };
                  });
                  return (
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: "#43505e", marginBottom: 5 }}>Câți candidați au avut media ≥ media acelei poziții — București / Ilfov / restul țării</div>
                      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr 1fr 1fr", gap: "4px 12px", fontFamily: M, fontSize: 12.5, alignItems: "center" }}>
                        <span style={{ fontFamily: F, fontSize: 10.5, color: "#43505e" }}></span>
                        <span style={{ fontFamily: F, fontSize: 10.5, color: "#43505e", fontWeight: 700 }}>București</span>
                        <span style={{ fontFamily: F, fontSize: 10.5, color: "#43505e", fontWeight: 700 }}>Ilfov</span>
                        <span style={{ fontFamily: F, fontSize: 10.5, color: "#43505e", fontWeight: 700 }}>Restul țării</span>
                        {blocks.map(({ an, m, c }) => (
                          [<span key={an + "l"} style={{ fontFamily: F, fontSize: 11.5, fontWeight: 600 }}>{an} {m != null ? `(≥ ${fmt(m)})` : ""}</span>,
                           <span key={an + "b"}>{c ? fi(c.B) : "—"} <span style={{ color: "#9fb0c4", fontSize: 10 }}>din {fi(REG_TOTALURI[an].B)}</span></span>,
                           <span key={an + "i"}>{c ? fi(c.IF) : "—"} <span style={{ color: "#9fb0c4", fontSize: 10 }}>din {fi(REG_TOTALURI[an].IF)}</span></span>,
                           <span key={an + "r"}>{c ? fi(c.REST) : "—"} <span style={{ color: "#9fb0c4", fontSize: 10 }}>din {fi(REG_TOTALURI[an].REST)}</span></span>]
                        ))}
                      </div>
                      <div style={{ fontSize: 10, color: "#43505e", marginTop: 7, lineHeight: 1.5 }}>
                        Numai 2022 și 2025: în sursa de date (SIIIR), județul candidatului există doar pentru acești doi ani — pentru restul nu afișăm cifre pe care nu le putem verifica. Cumulat interpolat în benzi de 0,5 puncte (aproximativ la sutime). Verificare: totalul București 2022 (15.428) coincide exact cu numărul oficial de candidați prezenți. Relevanța pentru admiterea B: candidații din Ilfov cu medii mari sunt principala sursă de concurență din afara orașului (~2.500 de înscriși din alte județe la admiterea B în fiecare an).
                      </div>
                    </div>
                  );
                })()}
              </div>
            );
          })()}
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
          <input type="text" placeholder="Caută liceu sau specializare (ex: Lazăr, Mate-Info)…" value={interesQuery} onChange={(e) => setInteresQuery(e.target.value)} style={{ flex: "1 1 260px", fontSize: 13, padding: "8px 12px", border: "1px solid #7c8798", borderRadius: 8, outline: "none", fontFamily: F }} />
          {interesQuery && <button className="snl-btn" onClick={() => setInteresQuery("")} style={{ border: "1px solid #7c8798", background: "#fff", borderRadius: 8, padding: "8px 10px", fontSize: 12, color: "#43505e" }}>✕ șterge</button>}
          <button className="snl-btn" onClick={() => setDoarUrmarite(!doarUrmarite)} disabled={urmarite.length === 0} style={{ border: "1px solid " + (doarUrmarite ? "#B8801A" : "#7c8798"), background: doarUrmarite ? "#FBF3E2" : "#fff", color: doarUrmarite ? "#9a6b12" : urmarite.length === 0 ? "#9fb0c4" : "#43505e", borderRadius: 8, padding: "8px 12px", fontSize: 12.5, fontWeight: 600 }}>★ {doarUrmarite ? "arată toate" : `arată doar urmărite (${urmarite.length})`}</button>
        </div>

        <div>
          {shown.map((r) => {
            const isOpen = open === r.i, c = CLS[r.cls], pc = PROFIL_COLORS[r.p] || "#43505e";
            return (
              <div key={r.i} className="snl-row" style={{ background: "#fff", border: "1px solid #7c8798", borderLeft: "3px solid " + c.color, boxShadow: r.star ? "0 0 0 1px #B8801A inset, 0 0 0 1px #B8801A" : "none", borderRadius: 5, marginBottom: 7, overflow: "hidden" }}>
                <div className="snl-btn" onClick={() => setOpen(isOpen ? null : r.i)} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 14, alignItems: "center", padding: "11px 14px" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14.5, display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>{r.star && <span style={{ color: "#B8801A" }}>★</span>}{r.n}<span style={{ fontWeight: 500, color: "#43505e", fontSize: 11.5 }}>{TIP_SHORT[r.t] || r.t}</span></div>
                    <div style={{ fontSize: 13, color: "#43505e", marginTop: 2 }}><span style={{ color: pc, fontWeight: 600 }}>{r.p}</span> — {r.s}{r.b ? " · " + r.b : ""}</div>
                    <div style={{ fontSize: 11.5, color: "#43505e", marginTop: 3, display: "flex", gap: 12, flexWrap: "wrap" }}><span>{r.sec}</span><span>{r.l} locuri 2026</span><span>rang #{r.r}</span>{r.distKm != null && <span>🚶 ~{r.walkMin} min · {r.distKm.toFixed(1)} km*</span>}</div>
                  </div>
                  <div style={{ textAlign: "right", minWidth: 120 }}>
                    {mod === "pozitie" ? (<>
                      <div style={{ fontFamily: M, fontSize: 17, fontWeight: 600 }}>poz ≤ {fi(r.cutoff)}</div>
                      <div style={{ fontSize: 9.5, letterSpacing: ".06em", textTransform: "uppercase", color: "#43505e" }}>prag rang (real 2025)</div>
                      <div style={{ fontFamily: M, fontSize: 11, color: "#43505e", marginTop: 2 }}>marja ta: {r.margin >= 0 ? "+" : ""}{fi(r.margin)}</div>
                    </>) : (<>
                      <div style={{ fontFamily: M, fontSize: 17, fontWeight: 600, color: ACC }}>{esteCoada(r) ? "<5,00" : fmt(r.cutoff)}</div>
                      <div style={{ fontSize: 9.5, letterSpacing: ".06em", textTransform: "uppercase", color: "#43505e" }}>{esteCoada(r) ? "intrare liberă (istoric)" : "prag medie est. 2026"}</div>
                      <div style={{ fontFamily: M, fontSize: 11, color: "#43505e", marginTop: 2 }}>real 2025: {fmt(r.m)}</div>
                    </>)}
                  </div>
                  <div style={{ minWidth: 96, textAlign: "right" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 3, background: c.bg, color: c.color, border: "1px solid " + c.bd }}>{c.lab}</span>
                    <div style={{ fontSize: 10, color: "#43505e", marginTop: 3, fontFamily: M }}>istoric ~{r.ist.pooled}%*</div>
                    <div style={{ display: "flex", gap: 4, justifyContent: "flex-end", marginTop: 5 }}>
                      <button className="snl-btn" onClick={(e) => { e.stopPropagation(); toggleUrmarit(r.i); }} title="urmărește (independent de fișă)" style={{ fontSize: 13, padding: "3px 6px", borderRadius: 4, border: "1px solid " + (urmarite.includes(r.i) ? "#B8801A" : "#7c8798"), background: urmarite.includes(r.i) ? "#FBF3E2" : "#fff", color: urmarite.includes(r.i) ? "#B8801A" : "#9fb0c4" }}>★</button>
                      {r.l === 0
                        ? <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4, background: "#FDECEA", color: "#8f2f21", border: "1px solid #E5B5AF" }}>0 locuri 2026</span>
                        : <button className="snl-btn" onClick={(e) => { e.stopPropagation(); toggleSelect(r.i); }} style={{ fontSize: 10.5, fontWeight: 600, padding: "3px 8px", borderRadius: 4, border: "1px solid " + (selectate.includes(r.i) ? "#0E6E6E" : "#7c8798"), background: selectate.includes(r.i) ? "#0E6E6E" : "#fff", color: selectate.includes(r.i) ? "#fff" : "#43505e" }}>{selectate.includes(r.i) ? "✓ în fișă" : "+ fișă"}</button>}
                    </div>
                  </div>
                </div>
                {isOpen && (
                  <div style={{ borderTop: "1px dashed #7c8798", padding: "12px 14px", background: "#f6f7f4", fontSize: 12.5, color: "#43505e" }}>
                    <div style={{ fontFamily: M, fontSize: 12.5, background: "#fff", border: "1px solid #7c8798", borderRadius: 3, padding: "9px 11px", lineHeight: 1.7 }}>
                      {mod === "pozitie"
                        ? <span>prag rang 2026 ≈ ultima poziție 2025 = <b>{fi(r.cutoff)}</b> · bandă ±{fi(coreBand(r.cutoff, r.p))}/±{fi(safeBand(r.cutoff, r.p))}<br />poziția ta {fi(poz)} → marjă {r.margin >= 0 ? "+" : ""}{fi(r.margin)} locuri → {r.cls === "sigur" ? <span style={{ color: CLS.sigur.color, fontWeight: 600 }}>peste prag cu marjă robustă → cel mai sigur</span> : r.cls === "probabil" ? <span style={{ color: CLS.probabil.color, fontWeight: 600 }}>peste prag, marjă mică → probabil intri</span> : r.cls === "incert" ? <span style={{ color: CLS.incert.color, fontWeight: 600 }}>în zona coin-flip → incert</span> : <span style={{ color: CLS.improb.color, fontWeight: 600 }}>sub pragul de rang → improbabil</span>}</span>
                        : esteCoada(r)
                        ? <span>specializare <b>istoric neumplută</b>: pragul 2025 ({fmt(r.m)}) e sub 5,00 — ultimul admis a fost ultimul care a ales-o, nu o barieră de competiție. Nu afișăm un „prag estimat 2026" cu zecimale pentru că poziția prag ({fi(r.pos)}) cade în/dincolo de zona fără date valide a ierarhiei 2026 (absenți la 15.423-15.643, total 15.643). Practic: orice medie a intrat istoric. Verifică în schimb dacă profilul chiar corespunde intereselor — la aceste licee criteriul de decizie nu e pragul.</span>
                        : <span>prag medie 2026 = interpolare din distribuția reală EN2026 la percentila poziției prag ({(r.pos/TOTAL_EN2026_B*100).toFixed(1)}%, poz. {fi(r.pos)}) = <b>{fmt(r.cutoff)}</b> · bandă ±{medieBands(r.pos, r.p).b50.toFixed(2).replace(".",",")}/±{medieBands(r.pos, r.p).b90.toFixed(2).replace(".",",")} (calibrată pe adâncime și track)<br />media ta {fmt(media)} → {r.cls === "sigur" || r.cls === "probabil" ? <span style={{ color: CLS[r.cls].color, fontWeight: 600 }}>peste prag</span> : r.cls === "incert" ? <span style={{ color: CLS.incert.color, fontWeight: 600 }}>în banda de incertitudine</span> : <span style={{ color: CLS.improb.color, fontWeight: 600 }}>sub prag</span>}<br /><span style={{ color: "#43505e", fontWeight: 400 }}>scenariu ierarhie de admitere (corecție istorică 2024, un singur an de date): prag ≈ {fmt(r.cutoff + corectieV1V3(r.pos))} — pragul real tinde să fie mai mic; estimarea principală e cea conservatoare</span></span>}
                    </div>
                    <div style={{ marginTop: 8, color: "#43505e", fontSize: 12 }}>Reper real 2025: ultima medie {fmt(r.m)} · ultima poziție {fi(r.pos)} · prima medie {fmt(r.pm)} · {r.l5} locuri.</div>
                    {r.distKm != null && <div style={{ marginTop: 4, color: "#43505e", fontSize: 11 }}>* {r.distKm.toFixed(2)} km în linie dreaptă de la {homeLabel} · ~{r.walkMin} min pe jos (estimare, nu rută reală) — pentru mijloace de transport în comun, verifică pe Google Maps/Moovit sau cere-mi ruta exactă pentru acest liceu.</div>}
                    <div style={{ marginTop: 10, background: "#fff", border: "1px solid #e3e5e0", borderRadius: 4, padding: "8px 10px" }}>
                      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: "#43505e", marginBottom: 5 }}>Istoric — marjă echivalentă ~{(r.marjaProc*100).toFixed(1)}% · nu e o probabilitate calibrată</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr) auto", gap: 6, fontFamily: M, fontSize: 11.5 }}>
                        {HIST_YEARS.map((y, k) => (
                          <div key={y} style={{ textAlign: "center" }}>
                            <div style={{ color: "#9fb0c4", fontSize: 9.5 }}>{y}</div>
                            <div style={{ fontWeight: 700, color: r.ist.ani[k] < 50 ? "#c0392b" : r.ist.ani[k] < 80 ? "#9a6b12" : "#147a40" }}>{r.ist.ani[k]}%</div>
                          </div>
                        ))}
                        <div style={{ textAlign: "center", borderLeft: "1px solid #e3e5e0", paddingLeft: 8 }}>
                          <div style={{ color: "#9fb0c4", fontSize: 9.5 }}>medie 5 ani</div>
                          <div style={{ fontWeight: 700 }}>{r.ist.pooled}%</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 10.5, color: "#43505e", marginTop: 6, lineHeight: 1.5 }}>
                        Din 5 tranziții reale (2020-2025), la o marjă similară, câte specializări au rămas efectiv sub prag anul următor — pe fiecare an separat. Variază enorm (ex. {Math.min(...r.ist.ani)}%-{Math.max(...r.ist.ani)}% la marja ta) pentru că anii nu sunt echivalenți: unul are salt structural, doi sunt afectați de COVID. Media pe 5 ani nu e o șansă reală — e un rezumat care ascunde exact această instabilitate.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {shown.length === 0 && <div style={{ padding: 24, textAlign: "center", color: "#43505e" }}>Nicio specializare în acest filtru.</div>}
        </div>

        <div style={{ marginTop: 22, background: "#fff", borderRadius: 10, padding: "16px 18px", boxShadow: "0 1px 4px rgba(0,0,0,.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: selectate.length ? 10 : 0 }}>
            <div style={{ fontFamily: "'Spectral',serif", fontSize: 16, fontWeight: 600 }}>📋 Fișa mea de înscriere ({selectate.length})</div>
            {selectate.length > 0 && <button className="snl-btn" onClick={handleExport} style={{ background: "#0E6E6E", color: "#fff", border: "none", borderRadius: 6, padding: "8px 14px", fontSize: 12.5, fontWeight: 700 }}>⬇ Exportă fișa</button>}
          </div>
          {selectate.length === 0 && <div style={{ fontSize: 12.5, color: "#43505e" }}>Apasă „+ fișă" la specializările care te interesează, în ordinea reală a preferinței.</div>}
          {selectate.length > 0 && (() => {
            const nSigur = selectate.filter((idx) => classifyPos(DATA[idx].pos, poz, DATA[idx].p) === "sigur").length;
            const nOptiuni = selectate.length;
            return (
            <div>
              {nSigur === 0 && (
                <div style={{ background: "#FDECEA", border: "1px solid #E5B5AF", borderRadius: 6, padding: "9px 12px", fontSize: 12, color: "#8f2f21", marginBottom: 10, lineHeight: 1.5 }}>
                  <b>⚠ Fișa nu conține nicio opțiune SIGUR (după poziție).</b> Dacă niciun prag nu se dovedește accesibil, candidatul rămâne nerepartizat în etapa I (în 2025: 261 de candidați nerepartizați). Adaugă cel puțin 1-2 opțiuni cu marjă robustă la finalul listei.
                </div>
              )}
              {nOptiuni > 0 && nOptiuni < 5 && nSigur > 0 && (
                <div style={{ background: "#FBF3E2", border: "1px solid #E0C88F", borderRadius: 6, padding: "9px 12px", fontSize: 12, color: "#7a5c10", marginBottom: 10, lineHeight: 1.5 }}>
                  <b>Fișă scurtă ({nOptiuni} opțiuni).</b> Pe fișa reală nu există un cost pentru opțiuni suplimentare — o listă mai lungă doar reduce riscul de nerepartizare.
                </div>
              )}
              <div style={{ background: "#eef3f8", border: "1px solid #bccde0", borderRadius: 6, padding: "9px 12px", fontSize: 11.5, color: "#2b4a68", marginBottom: 10, lineHeight: 1.5 }}>
                <b>Ordinea corectă = strict preferința reală.</b> Algoritmul de repartizare (serial dictatorship, cf. ghid ISMB) îți dă prima opțiune de pe fișă la care poziția ta se califică — a pune o opțiune „sigură" deasupra uneia preferate NU crește nicio șansă, doar te poate plasa mai jos decât ai fi putut. Pune întâi ce îți dorești (chiar INCERT), apoi plasa de siguranță.
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "26px 1.4fr .5fr .7fr .7fr .7fr .7fr .55fr auto", gap: 6, fontSize: 10.5, color: "#43505e", padding: "4px 0", borderBottom: "1px solid #e3e5e0", textTransform: "uppercase", letterSpacing: ".04em" }}>
                <span>#</span><span>Liceu / specializare</span><span>Cod</span><span>Medie 2025→est.2026</span><span>Poz. 2025→est.2026</span><span>Clasif. poziție</span><span>Clasif. medie</span><span title="medie pe 5 tranziții istorice, nu probabilitate">Istoric*</span><span></span>
              </div>
              {selectate.map((idx, pos) => {
                const r = DATA[idx]; const cod = CODMAP[String(idx)] || "—";
                const clsPoz = classifyPos(r.pos, poz, r.p); const clsMedie = classifyMedie(r.pos, media, r.p); const pragMedie = medieFromPos(r.pos);
                const marjaProc = r.pos > 0 ? (r.pos - pozEchivalent) / r.pos : 0;
                const ist = istoricLaMarja(marjaProc);
                return (
                  <div key={idx} style={{ display: "grid", gridTemplateColumns: "26px 1.4fr .5fr .7fr .7fr .7fr .7fr .55fr auto", gap: 6, alignItems: "center", padding: "7px 0", borderBottom: "1px solid #f0f1ee", fontSize: 12 }}>
                    <span style={{ fontFamily: M, color: "#43505e" }}>{pos + 1}</span>
                    <span><b>{r.n}</b> <span style={{ color: "#43505e" }}>— {r.s}{r.b ? " · " + r.b : ""}</span></span>
                    <span style={{ fontFamily: M, color: cod === "—" ? "#c0392b" : "#43505e" }}>{cod}</span>
                    <span style={{ fontFamily: M }}>{esteCoada(r) ? <span>{fmt(r.m)} → liber</span> : <span>{fmt(r.m)} → {fmt(pragMedie)} <span style={{ color: "#9fb0c4" }}>±{medieBands(r.pos, r.p).b50.toFixed(2).replace(".", ",")}</span></span>}</span>
                    <span style={{ fontFamily: M }}>{fi(r.pos)} → {fi(r.pos)}</span>
                    <span style={{ fontWeight: 700, color: CLS[clsPoz].color }}>{CLS[clsPoz].lab}</span>
                    <span style={{ fontWeight: 700, color: CLS[clsMedie].color }}>{CLS[clsMedie].lab}</span>
                    <span style={{ fontFamily: M, color: "#43505e" }}>~{ist.pooled}%</span>
                    <span style={{ display: "flex", gap: 3, justifyContent: "flex-end" }}>
                      <button className="snl-btn" onClick={() => moveSel(pos, -1)} disabled={pos === 0} style={{ border: "none", background: "none", color: pos === 0 ? "#9fb0c4" : "#0E6E6E", fontSize: 13 }}>↑</button>
                      <button className="snl-btn" onClick={() => moveSel(pos, 1)} disabled={pos === selectate.length - 1} style={{ border: "none", background: "none", color: pos === selectate.length - 1 ? "#9fb0c4" : "#0E6E6E", fontSize: 13 }}>↓</button>
                      <button className="snl-btn" onClick={() => removeSel(idx)} style={{ border: "none", background: "none", color: "#c0392b", fontSize: 13 }}>✕</button>
                    </span>
                  </div>
                );
              })}
              <div style={{ fontSize: 11, color: "#43505e", marginTop: 8, lineHeight: 1.5 }}>
                „Poz. 2025→est.2026" arată aceeași cifră de ambele părți — metoda actuală presupune poziția neschimbată (persistență), nu e o predicție independentă. Clasificarea de bază rămâne categorică (SIGUR/PROBABIL/INCERT/IMPROBABIL) — nu există un model de probabilitate calibrat pe date suficiente. Coloana „Istoric*" e o medie pe 5 tranziții reale (2020-2025), NU o probabilitate: acoperirea reală a variat între 17% și 97% pentru aceeași marjă, în funcție de an (vezi „★" pe fiecare specializare pentru detaliul pe an). Codurile marcate „—" ({DATA.length - Object.keys(CODMAP).length} din {DATA.length}) n-au fost găsite în lista de coduri disponibilă — verifică-le pe broșura oficială ISMB înainte de completarea fișei reale. Notă: lista de coduri sursă (Coduri_licee) acoperă doar filiera Teoretică (Real/Umanist) — pentru Tehnic/Servicii/Resurse naturale nu există niciun cod în sursele disponibile, nu doar o potrivire ratată.
              </div>
            </div>
            );
          })()}
        </div>

        {showExport && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(11,18,32,.55)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={() => setShowExport(false)}>
            <div style={{ background: "#fff", borderRadius: 10, maxWidth: 760, width: "100%", maxHeight: "86vh", overflow: "auto", padding: "18px 20px", boxShadow: "0 8px 40px rgba(0,0,0,.35)" }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontFamily: "'Spectral',serif", fontSize: 17, fontWeight: 600 }}>Export fișă ({selectate.length} opțiuni)</div>
                <button className="snl-btn" onClick={() => setShowExport(false)} style={{ border: "1px solid #7c8798", background: "#fff", borderRadius: 6, padding: "4px 10px", fontSize: 13, color: "#43505e" }}>✕</button>
              </div>
              <div style={{ fontSize: 11.5, color: "#43505e", lineHeight: 1.5, marginBottom: 10 }}>
                În această previzualizare (sandbox), descărcarea directă de fișiere e blocată de browser — folosește <b>copierea</b>: lipești direct în Excel/Word. Butonul de descărcare rămâne funcțional când rulezi simulatorul în afara acestei ferestre.
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                <button className="snl-btn" onClick={copyTsv} style={{ background: "#0E6E6E", color: "#fff", border: "none", borderRadius: 6, padding: "8px 14px", fontSize: 12.5, fontWeight: 700 }}>📋 Copiază tabelul (Excel/Word)</button>
                <button className="snl-btn" onClick={copyHtml} style={{ border: "1px solid #0E6E6E", background: "#fff", color: "#0E6E6E", borderRadius: 6, padding: "8px 14px", fontSize: 12.5, fontWeight: 700 }}>📄 Copiază HTML (document tipăribil)</button>
                <button className="snl-btn" onClick={tryDownload} style={{ border: "1px solid #7c8798", background: "#fff", color: "#43505e", borderRadius: 6, padding: "8px 14px", fontSize: 12.5 }}>⬇ Încearcă descărcarea</button>
              </div>
              <div style={{ fontSize: 10.5, color: "#43505e", marginBottom: 4, textTransform: "uppercase", letterSpacing: ".04em" }}>Sau selectează manual din caseta de mai jos (Ctrl+A, Ctrl+C):</div>
              <textarea readOnly value={buildExport().tsv} onFocus={(e) => e.target.select()} style={{ width: "100%", height: 180, fontFamily: M, fontSize: 10.5, border: "1px solid #7c8798", borderRadius: 6, padding: 8, whiteSpace: "pre", boxSizing: "border-box" }} />
            </div>
          </div>
        )}

        <div style={{ marginTop: 26, borderTop: "1px solid #7c8798", paddingTop: 16, fontSize: 12.5, color: "#43505e", lineHeight: 1.6 }}>
          <div style={{ fontFamily: "'Spectral',serif", fontSize: 15, fontWeight: 600, color: "#16202b", marginBottom: 6 }}>Ce arată validarea pe 5 ani (citește)</div>
          <ul style={{ margin: "6px 0 0", paddingLeft: 18 }}>
            <li><b>Ordonare — nuanțat:</b> corelația globală de rang e ~0,99 pe ani tipici (scade la ~0,97 în ani COVID), dar e o iluzie: o produc perechile foarte depărtate. La vecini apropiați (≤150 locuri) ordinea se inversează în ~42% din cazuri (≤400 locuri: ~32%) — verificat direct pe date, mai instabil decât arăta versiunea anterioară (32%/22%). Folosește instrumentul pentru grupe mari (vârf / mijloc / jos), nu pentru a ordona fin licee aproape egale — acolo tratează-le ca la egalitate.</li>
            <li><b>Verdictul exact e mai puțin sigur:</b> metoda nimerește bine în ani tipici (eroare mediană ~336 locuri, ~5,7%), dar în 2 din 5 transiții (COVID 2020–2021) și 1 cu salt structural (2023→2024, bias +892, pe panel complet) a greșit mult. Nu trata pragul de rang ca pe o linie fixă.</li>
            <li><b>Clasele (bandă proporțională) — recalibrate PE ADÂNCIME (v2):</b> benzile fixe 6%/17% acopereau neuniform: 62,5-78,4% (core) și 87,9-97,3% (safe) în funcție de segmentul de poziție. Acum core=P75 și safe=P95 din shift-urile reale, pe segmente interpolate — acoperire uniformă ~72-77% / ~93-97%. Contraintuitiv, dar măsurat: pragurile de TOP au nevoie de benzi relative mai largi (11,6%/30,6% sub poz. 2.000) decât mijlocul (4-6%/15-17%) — pozițiile mici oscilează relativ mult de la an la an.</li>
            <li><b>Testat și respins:</b> media pozițiilor pe 3 ani (2022-24) ca predictor pentru 2025 — MAE 483 vs 292 pentru ultimul an singur (2024), pe același eșantion comparabil (n=292, necesită poziție validă în toți cei 4 ani). Ultimul an rămâne cel mai bun predictor; nu netezesc.</li>
            <li><b>Corecție față de versiunea anterioară:</b> banda ±250 era prea îngustă (acoperă doar ~55–73%), iar ajustarea cu numărul de locuri adăuga bias — am eliminat-o. Pragurile de rang nu se scalează cu locurile.</li>
            <li><b>Puncte slabe (red team):</b> am scos cele 24 de specializări cu examen de limbă — acolo se concentra cea mai mare instabilitate. Rămân riscuri: la prag sunt ~120–165 candidați cu aceeași medie, departajați după media de gimnaziu (criteriu pe care modelul nu îl vede); anii cu schimbare structurală (ex. 2023→2024, bias +892 pe panel complet) deplasează tot; poziția ta oficială ISMB poate fi pe alt univers de numărare decât pragurile din date — verific-o pe un punct cunoscut.</li>
            <li><b>Regula pentru fișă:</b> pune întâi opțiunile dorite (chiar INCERT), apoi destule SIGUR mai jos. Tratează drept asigurate doar specializările SIGUR cu marjă mare. Confruntă cu broșura oficială ISMB.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
