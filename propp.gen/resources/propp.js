/*
 propp.js
 created: 11-20-2004
 modified: 08-05-2009
 programmer: volkhvy
 */

function modalWin1(strID) {
    eval("open('all.htm#" + strID + "', 'idWin1', 'menubar=1,location=0,toolbar=0,status=0,scrollbars=1,resizable=0,width=470,height=500')");
}

function modalWin2(strURL) {
    eval("open('" + strURL + ".htm', 'idWin2', 'menubar=1,location=0,toolbar=0,status=0,scrollbars=1,resizable=0,width=470,height=500')");
}

function resetForm() {
    var obj1 = window.document.idForm1;
    for (var cnt1 = 1; cnt1 < 32; cnt1++) {
	eval("obj1.func" + cnt1 + ".checked = false");
    }
    obj1.func8a.checked = false;
}

// set up function arrays
var proppFunction1 = ["function 1: member(s) of family absents themselves from home = absentation (beta)",
                               "beta1 - absentation (departure) of elder(s)",
                               "beta2 - death of parent(s)",
                               "beta3 - absentation (departure) of sibling(s)"];
var proppFunction2 = ["function 2: an interdiction is addressed to protagonist(s) = interdiction (gamma)",
                               "gamma1 - interdiction issued",
                               "gamma2 - inverted form of interdiction issued as order or suggestion"];
var proppFunction3 = ["function 3: interdiction is violated = violation (delta)",
                               "delta1 - interdiction violated",
                               "delta2 - order or suggestion executed"];
var proppFunction4 = ["function 4: antagonist(s) makes attempt at reconnaissance = reconnaissance (epsilon)",
                               "epsilon1 - reconnaissance by antagonist(s) to obtain information about victim(s) / protagonist(s)",
                               "epsilon2 - inverted form of reconnaissance by victim(s) / protagonist(s) to obtain information about antagonist(s)",
                               "epsilon3 - reconnaissance by other person(s)"];
var proppFunction5 = ["function 5: antagonist(s) receives information about victim(s) / protagonist(s) = delivery (zeta)",
                               "zeta1 - antagonist(s) receives information about victim(s) / protagonist(s)",
                               "zeta2 - inverted form of delivery as victim(s) / protagonist(s) receives information about antagonist(s)",
                               "zeta3 - information received by other means"];
var proppFunction6 = ["function 6: antagonist(s) attempts to deceive victim(s) / protagonist(s) in order to take possession of them or their belongings = trickery (eta)",
                               "eta1 - deceitful persuasions by antagonist(s)",
                               "eta2 - direct application of magical agents by antagonist(s)",
                               "eta3 - use of other forms of deception or coercion"];
var proppFunction7 = ["function 7: victim(s) / protagonist(s) accept deception and unwittingly help antagonist(s) = complicity (theta/lamda)",
                               "theta1 - victim(s) / protagonist(s) reacts to persuasions of antagonist(s)",
                               "theta2 - victim(s) / protagonist(s) mechanically falls victim to influence of magical agent",
                               "theta3 - victim(s) / protagonist(s) gives in or reacts mechanically to deceit of antagonist(s)",
                               "lamda - preliminary misfortune caused by deceitful agreement"];
var proppFunction8 = ["function 8: antagonist(s) causes harm or injury to victim(s)/member of protagonist(s)'s family = villainy (A)",
                               "A1 - kidnapping of person",
                               "A2 - seizure of magical agent or helper, or Aii - forcible seizure of magical helper",
                               "A3 - pillaging or ruining of crops",
                               "A4 - theft of daylight",
                               "A5 - plundering in other forms",
                               "A6 - bodily injury, maiming, mutilation",
                               "A7 - causes sudden disappearance, or Avii - bride is forgotten",
                               "A8 - demand for delivery or enticement, deceitful agreement",
                               "A9 - expulsion",
                               "A10 - casting into body of water",
                               "A11 - casting of a spell, transformation",
                               "A12 - false substitution",
                               "A13 - issues order to kill [requires proof]",
                               "A14 - commits murder",
                               "A15 - imprisonment, detention",
                               "A16 - threat of forced matrimony, or Axvi - threat of forced matrimony between relatives",
                               "A17 - threat of cannibalism, or Axvii - threat of cannibalism among relatives",
                               "A18 - tormenting at night (visitation, vampirism)",
                               "A19 - declaration of war"];
var proppFunction8a = ["function 8a: one member of family lacks/desires something = lack (a)",
                                "a1 - lack of bride, friend, or an individual",
                                "a2 - lack of helper or magical agent",
                                "a3 - lack of wondrous object(s)",
                                "a4 - lack of egg of death or love",
                                "a5 - lack of money or means of existence",
                                "a6 - lacks in other forms"];
var proppFunction9 = ["function 9: misfortune/lack made known, protagonist(s) approached with request/command, they are allowed to go/dispatched = mediation, connective incident (B)",
                               "B1 - call for help received, protagonist(s) as seeker dispatched",
                               "B2 - protagonist(s) as seeker dispatched directly",
                               "B3 - protagonist(s) as seeker released, allowed to depart",
                               "B4 - annoucement of misfortune in other forms, protagonist(s) as seeker departs",
                               "B5 - transportation of banished protagonist(s) as victim",
                               "B6 - condemned protagonist(s) as victim released, spared",
                               "B7 - lamment or plaintive song by/about victim, heard/sung by protagonist(s)"];
var proppFunction10 = ["function 10: protagonist(s) agrees to or decides on counteraction = beginning counteraction (C)",
                                "C - protagonist(s) as seeker consents to counteraction"];
var proppFunction11 = ["function 11: protagonist(s) leaves home = departure (up arrow)",
                                "up arrow - departure, dispatch of protagonist(s) from home"];
var proppFunction12 = ["function 12: protagonist(s) tested, interogated, attacked, etc. which prepares way for receiving magical agent or helper = first function of donor (D)",
                                "D1 - donor tests protagonist(s)",
                                "D2 - donor greets and interrogates protagonist(s)",
                                "D3 - request of favor after death",
                                "D4 - entreaty of prisoner for freedom,  or *D4 - entreaty of prisoner for freedom, with preliminary imprisonment",
                                "D5 - request for mercy",
                                "D6 - request for division, or d6 - argument without express request for division",
                                "D7 - other requests, or *D7 - other requests, with preliminary helpless situation of person making request, or d7 - helpless situation of donor without stated request, possibility of rendering service",
                                "D8 - attempt to destroy",
                                "D9 - combat with hostile donor",
                                "D10 - offer of magical agent as an exchange"];
var proppFunction13 = ["function 13: protagonist(s) reacts to actions of future donor = protagonist(s)'s reaction (E)",
                                "E1 - protagonist(s) withstands ordeal (or not)",
                                "E2 - protagonist(s) answers greeting (or not)",
                                "E3 - protagonist(s) renders service to dead person (or not)",
                                "E4 - protagonist(s) frees of captive",
                                "E5 - mercy to suppliant",
                                "E6 - protagonist(s)completes apportinment and reconciles disputants, or Evi - protagonist(s) deceives disputants",
                                "E7 - performance of some other service, fulfillment of request, pious deeds",
                                "E8 - attempt at destruction averted by turnabout",
                                "E9 - protagonist(s) vanquishes hostile donor (or not)",
                                "E10 - deception in an exchange, protagonist(s) employs magical agent on donor"];
var proppFunction14 = ["function 14: protagonist(s) acquires use of magical agent = acquisition of magical agent (F)",
                                "F1 - agent is directly transferred, or f1 - gift is of a material nature, or F- - agent is not transferred, or F= - protagonist(s)'s negative reaction provokes cruel retribution",
                                "F2 - agent is pointed out",
                                "F3 - agent is prepared",
                                "F4 - agent is sold and purchased, or F43 - agent is made on order",
                                "F5 - agent is found by chance",
                                "F6 - agent suddenly appears of its own accord, or Fvi - agent appears from out of earth",
                                "F7 - agent is drunk or eaten",
                                "F8 - agent is seized",
                                "F9 - agent offers its services, places itself at someone's disposal, or f9 - agent indicates it will appear of its own accord in some time of need, or F96 - meeting with magical helper(s) who offers their services"];
var proppFunction15 = ["function 15: protagonist(s) transferred, delivered or led to vicinity of object of search = transference, guidance (G)",
                                "G1 - protagonist(s) flies thru air",
                                "G2 - protagonist(s) travels on ground or water",
                                "G3 - protagonist(s) is led",
                                "G4 - route is shown to protagonist(s)",
                                "G5 - protagonist(s) makes use of stationary means of communication (stairs, bridge, passageway. etc.)",
                                "G6 - marked trail shows the way (blood, tracks, yarn, etc.)"];
var proppFunction16 = ["function 16: protagonist(s) and antagonist(s) join in direct combat = struggle (H)",
                                "H1 - fight in an open battle",
                                "H2 - contest, competition",
                                "H3 - game of chance",
                                "H4 - weighing with scales"];
var proppFunction17 = ["function 17: protagonist(s) branded = branding (J)",
                                "J1 - application of mark to body of protagonist(s) (wound, brand)",
                                "J2 - transference of token (ring, towel, etc.)"];
var proppFunction18 = ["function 18: antagonist(s) defeated = victory (I)",
                                "I1 - antagonist(s) defeated in open battle, or *I1 - antagonist(s) defeated by one protagonist(s) while the other(s) hide",
                                "I2 - antagonist(s) defeated in contest",
                                "I3 - antagonist(s) defeated at game of chance",
                                "I4 - antagonist(s) defeated in weighing with scales",
                                "I5 - protagonist(s) kills antagonist(s) without preliminary fight",
                                "I6 - direct expulsion of antagonist(s)"];
var proppFunction19 = ["function 19: initial misfortune or lack is liquidated = liquidation (K)",
                                "K1 - direct acquistion thru application of force or cunning, or Ki - direct acquistion thru application of force or cunning, with one person compelling another",
                                "K2 - acquisition accomplished by several helpers at once",
                                "K3 - acquisition achieved with help of an enticement or decoy(s)",
                                "K4 - liquidation of misfortune as direct result of previous actions",
                                "K5 - object of search attained instantly thru use of magical agent",
                                "K6 - poverty done away with thru use of magical agent",
                                "K7 - object of search captured",
                                "K8 - breaking of spell on victim",
                                "K9 - resuscitation of slain, or Kix - resuscitation, with preliminary obtaining of water of life",
                                "K10 - release from captivity",
                                "KF1 - liquidation in form F: object of search is transferred",
                                "KF2 - liquidation in form F: object of search is pointed out",
                                "KF3 - liquidation in form F: object of search is prepared",
                                "KF4 - liquidation in form F: object of search is sold, purchased, or KF43 - liquidation in form F: object of search is made on order",
                                "KF5 - liquidation in form F: object of search is found",
                                "KF6 - liquidation in form F: object of search appears of its own accord, or KFvi - liquidation in form F: object of search appears from out of earth",
                                "KF7 - liquidation in form F: object of search is drunk or eaten",
                                "KF8 - liquidation in form F: object of search is seized",
                                "KF9 - liquidation in form F: object of search offers its services, places itself at someone's disposal, or KF96 - liquidation in form F: object of search are helpers who offers their services"];
var proppFunction20 = ["function 20: protagonist(s) returns = return (down arrow)",
                                "down arrow - return of protagonist(s)"];
var proppFunction21 = ["function 21: protagonist(s) pursued = pursuit (Pr)",
                                "Pr1 - antagonist(s) flies thru air",
                                "Pr2 - antagonist(s) demands guilty person",
                                "Pr3 - antagonist(s) pursues, accompanied by series of transformations into animals",
                                "Pr4 - antagonist(s) pursues, with tranformations into enticing objects",
                                "Pr5 - antagonist(s) attempts to devour protagonist(s)",
                                "Pr6 - antagonist(s) attempts to destroy protagonist(s)",
                                "Pr7 - antagonist(s) attempts to gnaw thru tree with protagonist(s) up in it"];
var proppFunction22 = ["function 22: rescue of protagonist(s) from pursuit = rescue (Rs)",
                                "Rs1 - protagonist(s) carried thru air or runs quickly",
                                "Rs2 - protagonist(s) places obstacles in path of pursuers [with transformation]",
                                "Rs3 - fleeing, with transformation to escape recognition",
                                "Rs4 - fleeing with concealment of escapee",
                                "Rs5 - concealment of escapee by blacksmiths",
                                "Rs6 - escapee goes thru series of transformations into animals, plants & stones",
                                "Rs7 - warding off temptation of enticing object(s)",
                                "Rs8 - rescue or salvation from being devoured",
                                "Rs9 - rescue or salvation from being destroyed",
                                "Rs10 - leap into another tree"];
var proppFunction23 = ["function 23: protagonist(s), unrecognized, arrives home or another country = unrecognized arrival (o)",
                                "o - unrecognized arrival"];
var proppFunction24 = ["function 24: false protagonist(s) presents unfounded claims = unfounded claims (L)",
                                "L - claims of false protagonist(s)"];
var proppFunction25 = ["function 25: difficult task proposed to protagonist(s) = difficult task (M)",
                                "M1 - ordeal by food and drink",
                                "M2 - ordeal by fire",
                                "M3 - riddle guessing",
                                "M4 - ordeal of choice",
                                "M5 - hide and seek",
                                "M6 - test of strength",
                                "M7 - test of adroitness",
                                "M8 - test of fortitude",
                                "M9 - test of endurance",
                                "M10 - tasks of supply, or Mx - tasks of manufacture",
                                "M11 - sorting tasks",
                                "M12 - other tasks"];
var proppFunction26 = ["function 26: task resolved = solution (N)",
                                "N1 - food and drink consumed",
                                "N2 - fire survived",
                                "N3 - riddle guessed",
                                "N4 - correct choice selected",
                                "N5 - protagonist(s) not found",
                                "N6 - test of strength passed",
                                "N7 - test of adroitness passed",
                                "N8 - test of fortitude passed",
                                "N9 - test of endurance passed",
                                "N10 - object(s) supplied, or Nx - object(s) manufactured",
                                "N11 - sorting tasks completed",
                                "N12 - other tasks completed"];
var proppFunction27 = ["function 27: protagonist(s) recognized = recognition (Q)",
                                "Q1 - recognition of protagonist(s) by mark on body",
                                "Q2 - recognition of protagonist(s) by token",
                                "Q3 - recognition of protagonist(s) by accomplishment of difficult task",
                                "Q4 - recognition of protagonist(s) by family member"];
var proppFunction28 = ["function 28: false protagonist(s) or antagonist(s) exposed = exposure (Ex)",
                                "Ex1 - exposure of false protagonist(s) or antagonist(s) by lack of mark on body",
                                "Ex2 - exposure of false protagonist(s) or antagonist(s) by lack of token",
                                "Ex3 - exposure of false protagonist(s) or antagonist(s) by failure to accomplish difficult task",
                                "Ex4 - exposure of false protagonist(s) or antagonist(s) thru song / lament"];
var proppFunction29 = ["function 29: protagonist(s) given new appearance = transfiguration (T)",
                                "T1 - new physical appearance by magical action of helper",
                                "T2 - protagonist(s) builds palace",
                                "T3 - protagonist(s) puts on new garments",
                                "T4 - humorous and rationalized forms, new appearance achieved by deception"];
var proppFunction30 = ["function 30: false protagonist(s) or antagonist(s) punished = punishment (U)",
                                "U - punishment of false protagonist(s) or antagonist(s)",
                                "U- - false protagonist(s) or antagonist(s) pardoned"];
var proppFunction31 = ["function 31: protagonist(s) marries and ascends throne = wedding (W)",
                                "W#* - protagonist(s) weds and ascends throne ",
                                "W# - protagonist(s) weds",
                                "W* - protagonist(s) ascends throne",
                                "w1 - protagonist(s) promised marriage",
                                "w2 - protagonist(s) resumes marriage",
                                "wo - protagonist(s) given monetary reward or other forms of material gain"];

// generate random number
function random(intMax) {
    return Math.floor(Math.random() * intMax);
}

var flgAntagonist = 0;
var flgDispatcher = 0;
var flgDonor = 0;
var flgFalseProtagonist = 0;
var flgHelper = 0;
var flgSoughtFor = 0;
var ndxFunc2 = 0;
var ndxFunc4 = 0;
var ndxFunc6 = 0;
var ndxFunc8 = 0;
var ndxFunc8a = 0;
var ndxFunc9 = 0;
var ndxFunc12 = 0;
var ndxFunc16 = 0;
var ndxFunc17 = 0;
var ndxFunc19 = 0;
var ndxFunc19a = 0;
var ndxFunc21 = 0;
var ndxFunc25 = 0;
var ndxFunc27 = 0;
var ndxFunc28 = 0;
var str1 = "";

function initializeGenerator() {
    flgAntagonist = 0;
    flgDispatcher = 0;
    flgDonor = 0;
    flgFalseProtagonist = 0;
    flgHelper = 0;
    flgSoughtFor = 0;
    ndxFunc2 = 0;
    ndxFunc4 = 0;
    ndxFunc6 = 0;
    ndxFunc8 = 0;
    ndxFunc8a = 0;
    ndxFunc9 = 0;
    ndxFunc12 = 0;
    ndxFunc16 = 0;
    ndxFunc17 = 0;
    ndxFunc19 = 0;
    ndxFunc19a = 0;
    ndxFunc21 = 0;
    ndxFunc25 = 0;
    ndxFunc27 = 0;
    ndxFunc28 = 0;
    str1 = "";
}

function betaTheta() {
    var obj1 = window.document.idForm1;
    if (obj1.func1.checked) {
	str1 += proppFunction1[0] + "\n---------------------------\n";
	str1 += proppFunction1[random(proppFunction1.length - 1) + 1] + "\n\n";
    }
    if (obj1.func2.checked) {
	str1 += proppFunction2[0] + "\n---------------------------\n";
	ndxFunc2 = random(proppFunction2.length - 1) + 1;
	str1 += proppFunction2[ndxFunc2] + "\n\n";
    }
    if (obj1.func3.checked) {
	str1 += proppFunction3[0] + "\n---------------------------\n";
	if (ndxFunc2 > 0) {
	    str1 += proppFunction3[ndxFunc2] + "\n\n";
	} else {
	    str1 += proppFunction3[random(proppFunction3.length - 1) + 1] + "\n\n";
	}
    }
    if (obj1.func4.checked) {
	str1 += proppFunction4[0] + "\n---------------------------\n";
	ndxFunc4 = random(proppFunction4.length - 1) + 1;
	str1 += proppFunction4[ndxFunc4] + "\n\n";
    }
    if (obj1.func5.checked) {
	str1 += proppFunction5[0] + "\n---------------------------\n";
	if (ndxFunc4 > 0) {
	    str1 += proppFunction5[ndxFunc4] + "\n\n";
	} else {
	    str1 += proppFunction5[random(proppFunction5.length - 1) + 1] + "\n\n";
	}
	flgAntagonist = 1;
    }
    if (obj1.func6.checked) {
	str1 += proppFunction6[0] + "\n---------------------------\n";
	ndxFunc6 = random(proppFunction4.length - 1) + 1;
	str1 += proppFunction6[ndxFunc6] + "\n\n";
    }
    if (obj1.func7.checked) {
	str1 += proppFunction7[0] + "\n---------------------------\n";
	if (ndxFunc6 > 0) {
	    str1 += proppFunction5[ndxFunc6] + "\n\n";
	} else {
	    str1 += proppFunction7[random(proppFunction7.length - 1) + 1] + "\n\n";
	}
	flgAntagonist = 1;
    }
}

function DEF() {
    var obj1 = window.document.idForm1;
    if (obj1.func12.checked) {
	str1 += proppFunction12[0] + "\n---------------------------\n";
	ndxFunc12 = random(proppFunction12.length - 1) + 1;
	str1 += proppFunction12[ndxFunc12] + "\n\n";
	flgDonor = 1;
    }
    if (obj1.func13.checked) {
	str1 += proppFunction13[0] + "\n---------------------------\n";
	str1 += proppFunction13[ndxFunc12] + "\n\n";
    }
    if (obj1.func14.checked) {
	str1 += proppFunction14[0] + "\n---------------------------\n";
	str1 += proppFunction14[random(proppFunction14.length - 1) + 1] + "\n\n";
	flgDonor = 1;
    }
}

function ABCuparrowDEFG() {
    var obj1 = window.document.idForm1;
    if (obj1.func12.checked) {
	if (obj1.moveDEF[1].checked || obj1.moveDEF[2].checked) {
	    DEF();
	}
    }
    if (obj1.func9.checked) {
	ndxFunc9 = random(proppFunction9.length - 1) + 1;
    }
    if (obj1.func8.checked) {
	str1 += proppFunction8[0] + "\n---------------------------\n";
	if (ndxFunc9 == 7) {
	    ndxFunc8 = 14;
	} else {
	    ndxFunc8 = random(proppFunction8.length - 1) + 1;
	}
	str1 += proppFunction8[ndxFunc8] + "\n\n";
	flgAntagonist = 1;
    }
    if (obj1.func8a.checked) {
	str1 += proppFunction8a[0] + "\n---------------------------\n";
	ndxFunc8a = random(proppFunction8a.length - 1) + 1;
	str1 += proppFunction8a[ndxFunc8a] + "\n\n";
    }
    if (obj1.func9.checked) {
	str1 += proppFunction9[0] + "\n---------------------------\n";
	str1 += proppFunction9[ndxFunc9] + "\n\n";
	flgDispatcher = 1;
    }
    if (obj1.func10.checked) {
	if (ndxFunc9 > 0 && ndxFunc9 < 5) {
	    str1 += proppFunction10[0] + "\n---------------------------\n";
	    str1 += proppFunction10[random(proppFunction10.length - 1) + 1] + "\n\n";
	}
    }
    if (obj1.func11.checked) {
	str1 += proppFunction11[0] + "\n---------------------------\n";
	str1 += proppFunction11[random(proppFunction11.length - 1) + 1] + "\n\n";
    }
    if (obj1.func12.checked) {
	if (!obj1.moveDEF[1].checked) {
	    DEF();
	}
    }
    if (obj1.func15.checked) {
	str1 += proppFunction15[0] + "\n---------------------------\n";
	str1 += proppFunction15[random(proppFunction15.length - 1) + 1] + "\n\n";
	flgHelper = 1;
    }
}

function HJI() {
    var obj1 = window.document.idForm1;
    if (obj1.func16.checked) {
	str1 += proppFunction16[0] + "\n---------------------------\n";
	ndxFunc16 = random(proppFunction16.length - 1) + 1;
	str1 += proppFunction16[ndxFunc16] + "\n\n";
    }
    if (obj1.func17.checked) {
	str1 += proppFunction17[0] + "\n---------------------------\n";
	ndxFunc17 = random(proppFunction17.length - 1) + 1;
	str1 += proppFunction17[ndxFunc17] + "\n\n";
	if (ndxFunc17 == 2) {
	    flgSoughtFor = 1;
	}
    }
    if (obj1.func18.checked) {
	str1 += proppFunction18[0] + "\n---------------------------\n";
	if (ndxFunc16 > 0) {
	    str1 += proppFunction18[ndxFunc16] + "\n\n";
	} else {
	    str1 += proppFunction18[random(proppFunction18.length - 1) + 1] + "\n\n";
	}
	flgAntagonist = 1;
    }
} // end  of function

function Kdownarrow() {
    var obj1 = window.document.idForm1;
    if (obj1.func19.checked) {
	str1 += proppFunction19[0] + "\n---------------------------\n";
	if (ndxFunc8 == 3) {
	    ndxFunc19 = 7;
	} else if (ndxFunc8 == 11) {
	    ndxFunc19 = 8;
	} else if (ndxFunc8 == 14) {
	    ndxFunc19 = 9;
	} else if (ndxFunc8 == 15) {
	    ndxFunc19 = 10;
	} else {
	    ndxFunc19 = random(proppFunction19.length - 1) + 1;
	}
	str1 += proppFunction19[ndxFunc19] + "\n\n";
	flgHelper = 1;
    }
    if (obj1.func19a.checked) {
	str1 += proppFunction19[0] + "\n---------------------------\n";
	if (ndxFunc8a == 2) {
	    ndxFunc19a = 19;
	} else if (ndxFunc8a == 5) {
	    ndxFunc19a = 6;
	} else {
	    ndxFunc19a = random(proppFunction19.length - 1) + 1;
	}
	str1 += proppFunction19[ndxFunc19a] + "\n\n";
	flgHelper = 1;
    }
    if (obj1.func20.checked) {
	str1 += proppFunction20[0] + "\n---------------------------\n";
	str1 += proppFunction20[random(proppFunction20.length - 1) + 1] + "\n\n";
    }
} // end  of function

function PrRs() {
    var obj1 = window.document.idForm1;
    if (obj1.func21.checked) {
	str1 += proppFunction21[0] + "\n---------------------------\n";
	ndxFunc21 = random(proppFunction21.length - 1) + 1;
	str1 += proppFunction21[ndxFunc21] + "\n\n";
    }
    if (obj1.func22.checked) {
	str1 += proppFunction22[0] + "\n---------------------------\n";
	if (ndxFunc21 == 1) {
	    str1 += proppFunction22[ndxFunc21] + "\n\n";
	} else if (ndxFunc21 == 2) {
	    str1 += proppFunction22[random(proppFunction22.length - 1) + 1] + "\n\n";
	} else if (ndxFunc21 > 2) {
	    str1 += proppFunction22[ndxFunc21 + 3] + "\n\n";
	}
	flgAntagonist = 1;
	flgHelper = 1;
    }
} // end  of function

function oL() {
    var obj1 = window.document.idForm1;
    if (obj1.func23.checked) {
	str1 += proppFunction23[0] + "\n---------------------------\n";
	str1 += proppFunction23[random(proppFunction23.length - 1) + 1] + "\n\n";
    }
    if (obj1.func24.checked) {
	str1 += proppFunction24[0] + "\n---------------------------\n";
	str1 += proppFunction24[random(proppFunction24.length - 1) + 1] + "\n\n";
	flgFalseProtagonist = 1;
    }
} // end  of function

function MJN() {
    var obj1 = window.document.idForm1;
    if (obj1.func25.checked) {
	str1 += proppFunction25[0] + "\n---------------------------\n";
	ndxFunc25 = random(proppFunction25.length - 1) + 1;
	str1 += proppFunction25[ndxFunc25] + "\n\n";
	flgSoughtFor = 1;
    }
    if (obj1.func17.checked) {
	str1 += proppFunction17[0] + "\n---------------------------\n";
	ndxFunc17 = random(proppFunction17.length - 1) + 1;
	str1 += proppFunction17[ndxFunc17] + "\n\n";
	if (ndxFunc17 == 2) {
	    flgSoughtFor = 1;
	}
    }
    if (obj1.func26.checked) {
	str1 += proppFunction26[0] + "\n---------------------------\n";
	str1 += proppFunction26[ndxFunc25] + "\n\n";
	flgHelper = 1;
    }
} // end  of function

function QExTUW() {
    var obj1 = window.document.idForm1;
    if (obj1.func27.checked) {
	str1 += proppFunction27[0] + "\n---------------------------\n";
	if (ndxFunc17 == 1 | ndxFunc17 == 2) {
	    ndxFunc27 = ndxFunc17;
	} else {
	    ndxFunc27 = random(proppFunction27.length - 1) + 1;
	}
	str1 += proppFunction27[ndxFunc27] + "\n\n";
	if (ndxFunc27 == 2 || ndxFunc27 == 3) {
	    flgSoughtFor = 1;
	}
    }
    if (obj1.func28.checked) {
	str1 += proppFunction28[0] + "\n---------------------------\n";
	if (ndxFunc17 ==1 | ndxFunc17 == 2) {
	    ndxFunc28 = ndxFunc17;
	} else if (ndxFunc25 > 0) {
	    ndxFunc28 = 3;
	} else {
	    ndxFunc28 = random(proppFunction28.length - 1) + 1;
	}
	str1 += proppFunction28[ndxFunc28] + "\n\n";
	if (ndxFunc28 ==2 || ndxFunc28 == 3) {
	    flgSoughtFor = 1;
	}
    }
    if (obj1.func29.checked) {
	str1 += proppFunction29[0] + "\n---------------------------\n";
	str1 += proppFunction29[random(proppFunction29.length - 1) + 1] + "\n\n";
	flgHelper = 1;
    }
    if (obj1.func30.checked) {
	str1 += proppFunction30[0] + "\n---------------------------\n";
	str1 += proppFunction30[random(proppFunction30.length - 1) + 1] + "\n\n";
	flgSoughtFor = 1;
    }
    if (obj1.func31.checked) {
	str1 += proppFunction31[0] + "\n---------------------------\n";
	str1 += proppFunction31[random(proppFunction31.length - 1) + 1] + "\n\n";
	flgSoughtFor = 1;
    }
} // end  of function

function makeCharacterList() {
    str1 += "dramatis personae:\n   protagonist";
    if (ndxFunc9 > 0 && ndxFunc9 < 5) {
	str1 += " as seeker:\n";
    } else if (ndxFunc9 > 4 && ndxFunc9 < 7) {
	str1 += " as victim:\n";
    } else if (ndxFunc9 == 7) {
	str1 += " as victim, or related to victim:\n";
    } else {
	str1 += ":\n";
    }
    if (flgAntagonist) {
	str1 += "   antagonist:\n";
    }
    if (flgDispatcher) {
	str1 += "   dispatcher:\n";
    }
    if (flgDonor) {
	str1 += "   donor:\n";
    }
    if (flgHelper) {
	str1 += "   helper:\n";
    }
    if (flgSoughtFor) {
	str1 += "   person sought-for:\n";
    }
    if (flgFalseProtagonist) {
	str1 += "   false protagonist:\n";
    }
}

// generate outline for folktale
function generateOutline() {
    var obj1 = window.document.idForm1;
    initializeGenerator();
    betaTheta();
    ABCuparrowDEFG();
    if (obj1.func16.checked && !obj1.func25.checked) {
	HJI();
	Kdownarrow();
	PrRs();
	oL();
    } else if (!obj1.func16.checked && obj1.func25.checked) {
	oL();
	MJN();
	Kdownarrow();
	PrRs();
    } else if (obj1.func16.checked && obj1.func25.checked) {
	HJI();
	Kdownarrow();
	PrRs();
	oL();
	MJN();
	Kdownarrow();
	PrRs();
    } else {
	Kdownarrow();
	PrRs();
    }
    QExTUW();
    makeCharacterList();
    obj1.folktale.value = str1;
}

function setStructure () {
    var obj1 = window.document.idForm1;
    if (obj1.func12.checked) {
	obj1.moveDEF[0].checked = true;
    } else {
	obj1.moveDEF[0].checked = false;
	obj1.moveDEF[1].checked = false;
	obj1.moveDEF[2].checked = false;
    }
}

function setDEF() {
    var obj1 = window.document.idForm1;
    obj1.func12.checked = true;
    obj1.func13.checked = true;
}

function setCheckbox(strClicked, strPaired) {
    var obj1 = window.document.idForm1;
    if (eval("obj1.func" + strClicked + ".checked")) {
	eval("obj1.func" + strPaired + ".checked = true");
    } else {
	eval("obj1.func" + strPaired + ".checked = false");
    }
    setStructure();
}

function resetCheckbox(strClicked, strPaired) {
    var obj1 = window.document.idForm1;
    if (eval("obj1.func" + strClicked + ".checked == false")) {
	eval("obj1.func" + strPaired + ".checked = false");
    }
}
