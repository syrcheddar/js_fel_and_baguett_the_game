import React from "react";

function ClassInfo(props) {
	switch (props.class) {
		case 1:
			return (
				<div>
					<ul>
						<li> už dělá někde v korporátu, ale chce si založit startup </li>
						<li>programování je jeho život </li>
						<li>bojí se matiky </li>
						<li>
							šel na SIT jen protože na FISu se málo programuje a na OI je moc
							matiky
						</li>
						<li>
							softwarové (((inženýrství))) po státnicích ale dostane Bc.
						</li>
						<li>
							školu stejně nedodělá, protože v kormorátu už dostává víc peněz
							než jeho rodiče dohromady
						</li>
					</ul>
				</div>
			);
		case 2:
			return (
				<div>
					<ul>
						<li> tvrdí, že C je nadřazený jazyk, všechno píše v Javě</li>
						<li>neví, že se má bát matiky</li>
						<li>,,aspoň nejsem na kyru'' </li>
						<li>
							neví nic o fyzice, na výpočty mu stačí knihovny
						</li>
						<li>
							,,no jasně, že VIM''
						</li>
					</ul>
				</div>
			);
		case 3:
			return (
				<div>
					<ul>
						<li>má deprese z KAT</li>
						<li>,,na tom óíčku to máte hrozně jednoduchý´´</li>
						<li>nemá na hlouposti čas, dneska dělá úkol na ARI a zítra bude zas</li>
						<li>
							(((prestižní))) obor
						</li>
						<li>
							jako absolvent skončí buď ve výzkumu, nebo v STm
						</li>
					</ul>
				</div>
			);
		default:
			return "You shouldn't even see this, idiot!";
	}
}

export default ClassInfo;
