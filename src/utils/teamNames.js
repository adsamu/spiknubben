const adjectives = [
  "saltiga", "skummiga", "fuktiga", "djuplodade", "maritima",  "vindsvepta", "skeva",
  "brisiga", "stormiga", "blänkande", "vattniga", "drivande", "klippiga", "blåsande", "tångiga", "strömmande",
  "vresiga", "krusiga", "råa", "förtöjda", "svala", "våta", "algbeklädda",
  "tystgående", "sjösatta", "famnande", "bräcka", "sjöbrisiga", "flöjtande", "dimhöljda",
  "sirliga", "kalla", "sjudande", "saltmättade", "dyiga", "skummande", "sjöfyllda",
  "vågformade", "vindpinade", "skeppade", "simmiga", "tysta", "glittriga", "oändliga", "seglingsklara", 
  "nautiska", "svävande", "krusande", "klippskarpa", "bleka", "nattblåa", "fyrkantiga",
  "kustformade", "tärnlika", "vågskurna", "grottiga", "glidande", "sjötyska", "morgondisiga",
  "fiskformade", "snäckiga", "skrovliga", "sjögående", "havsdoftande", "krabbgångna", "rorsmanlika", 
  "algtunga", "havstätna", "ödsliga", "vattenglansiga", "skeppsformade", "djupgående", "solbländade", "navigerbara", "svanvita", "måslika",
  "vedeldade", "rökiga", "kådiga", "barriga", "knarriga", "mossiga", "tallrika", "myggrika", "gnistiga", "vedsågade",
  "näbbiga", "tjärdoftande", "iskalla", "gläntiga", "daggiga", "brasaheta",
  "ensliga", "vedvarma", "sprakande", "tystlåtna", "nattklara", "vidsynta",
  "järnspikiga", "snåriga", "stensatta", "myriga", "timmerskurna", "granvediga", "mörknande", "eldfulla",
  "fjälliga", "tundraklara", "vedförsedda", "mossbeklädda", "kvastiga", "gläntformade", "barkade", "kvittrande", "gryningsljusa", "murriga",
  "dova", "gyllene", "frostiga", "tjärade", "dimgråa", "kallmornade", "vinterbleka", "ensamma", "sträva",
  "koliga", "nävervita", "höstbruna", "skuggrika", "jordiga", "tätvuxna", "älvdolda", "ängsgröna",
  "björkvita", "vilda", "svala", "kilsågade", "vedklyvda", "eldröda", "fjäderlätta", "klara", "gryningsmjuka",
  "norrskenslika", "fuktmjuka", "sittvänliga", "hjortrika", "knutformade", "bärdoftande", 
  "stillastående", "trivsamma", "kvällsröda", "midnattssoliga", "norrländska", "tuvformade", "långsamma", "lågtakiga", "vädersäkra",
  "skymningsmjuka", "dovgråa", "barkmjuka", "mossmättade", "vedtäcka", "stormsäkra", "spjälade", "rötterika", "åretruntvänliga", "eldade",
  "regnsvala", "takbeklädda", "hällblöta", "knarrande", "kvistiga", "förtöjda", 
  "lavtäcka", "höljda", "kolsvarta", "lövkantade", "jordnära", "stubbrika", "fäbodkänsliga",
  "övervuxna", "brända", "lavklädda", "vårgröna", "viltstarka", 
  "svedda", "skymningsmilda", "granformiga", "dimtäcka", "stubbformade", "snövita", "myrdoftande", "daggklara",
  "kapsejsade", "svaga", "skygga", "töntiga", "hårda", "starka", "fulla", "nyktra", "spiklösa", "piskade", "väderbitna",
  "haltande", "skumma", "översaltade",
];

const nouns = [
  "sälarna", "gäddorna", "abborrarna", "hajarna", "måsarna", "tärnorna", "båtarna", "ekorna", "byggorna", 
  "valarna", "stockarna", "latmaskarna", "hårdingarna", "fiskarna", "katterna", "bryggorna", "tvestärtarna",
  "foppatofflorna", "sandalerna", "spikarna", "nubbarna", "kölen", "durksvinen", "separetterna", "dassen", 
  "brädorna", "vattendunkarna", "hinkarna", "mesarna", "kalsongerna", "strumporna", "badbyxorna", "kjolarna",
  "korvarna", "köttbitarna", "spetten", "stängerna", "sågarna", "hammarna", "kattungarna", "mörtarna", 
  "lössen", "grillarna", "skruvarna", "filtarna", "elefanterna", "bävrarna", "disktrasorna", "sniglarna",
  "ålarna", "kaptenerna", "styrmännen", "badringarna", "askkopporna", "flaskorna", "korkarna", "sopkorgarna",
  "utombordarna"

];

export function generateTeamName() {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adj} ${noun}`;
}

