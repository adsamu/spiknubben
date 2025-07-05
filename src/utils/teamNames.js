const adjectives = [
  "saltiga", "skummiga", "fuktiga", "djuplodade", "maritima", "vindsvepta", "skeva", "brisiga",
  "stormiga", "blänkande", "vattniga", "drivande", "klippiga", "blåsande", "tångiga", 
  "vresiga", "krusiga", "råa", "förtöjda", "svala", "våta", "algbeklädda", "tystgående",
  "sjösatta", "famnande", "flätade", "dimhöljda", "sirliga", "kalla",
  "sjudande", "saltmättade", "dyiga", "sjövilda", "vindpinade", "skeppade", "simmiga",
  "tysta", "glittriga", "oändliga", "nautiska", "svävande", "krusande", "klippskarpa", "bleka",
  "fyrkantiga", "tärnlika", "grottiga", "glidande", "morgondisiga", "fiskformade", "snäckiga",
  "skrovliga", "sjögående", "krabbgångna", "rorsmanlika", "ödsliga",
  "djupgående", "solbländande", "navigerande", "måslika", "vedeldade", "rökiga", "kådiga",
  "barriga", "knarriga", "mossiga", "gnistrande", "vedsågande", "näbbiga", "tjärdoftande", "iskalla",
  "daggiga", "brasaheta", "ensliga", "vedvarma", "sprakande", "tystlåtna", "nattklara", "vidsynta",
  "metalliska", "snåriga", "mörka", "eldiga", "fjälliga", "vedförsedda", "mossbeklädda", "kvastiga",
  "barkade", "kvittrande", "gryningsljusa", "murriga", "dova", "gyllene", "frostiga", "tjärade",
  "dimgråa", "solblekta", "ensamma", "sträva", "koliga", "bajsbruna", "jordiga", "tätvuxna",
  "vilda", "svala", "fjäderlätta", "klara", "mjuka", "norrskenslika", "sittvänliga", "knutformade",
  "fisande", "stillastående", "trivsamma", "norrländska", "långsamma", "låga", "vädersäkra", 
  "dovgråa", "mossmättade", "stormsäkra", "rotade", "åretruntvänliga", "regnsvala", "knarrande", "kvistiga",
  "lavtäcka", "höljda", "kolsvarta", "jordnära", "stubbiga", "övervuxna", "brända", "lavklädda",
  "vårgröna", "blöta", "svedda", "milda", "dimtäcka", "stubbformade", "snövita", "daggklara",
  "kapsejsade", "svaga", "skygga", "hårda", "starka", "fulla", "nyktra",
  "spiklösa", "piskade", "väderbitna", "haltande", "skumma", "översaltade", "illaluktande", "osande",
  "fattiga", "pensionerade", "spräckta", "närsynta", "vältaliga", "överfulla", "tunga", "viktlösa",
  "kluckande", "dansande", "snabba", "snarkande", "skvallriga", "passionerade", "sjörövande"
];

const nouns = [
  "sälarna", "gäddorna", "abborrarna", "hajarna", "måsarna", "tärnorna", "båtarna", "ekorna", "byggorna",
  "valarna", "stockarna", "latmaskarna", "hårdingarna", "fiskarna", "katterna", "bryggorna", "tvestärtarna",
  "foppatofflorna", "sandalerna", "spikarna", "nubbarna", "kölen", "durksvinen", "separetterna", "dassen",
  "brädorna", "vattendunkarna", "hinkarna", "mesarna", "kalsongerna", "strumporna", "badbyxorna", "kjolarna",
  "korvarna", "köttbitarna", "spetten", "gummistövlarna", "sågarna", "hammarna", "kattungarna", "mörtarna",
  "lössen", "grillarna", "skruvarna", "filtarna", "elefanterna", "bävrarna", "disktrasorna", "sniglarna",
  "ålarna", "kaptenerna", "styrmännen", "badringarna", "askkopporna", "flaskorna", "korkarna", "sopkorgarna",
  "utombordarna", "knölarna", "bystarna", "fötterna", "elementen", "myggorna", "flytvästarna", "surfarna",
  "dasslocken", "sittdynorna", "sjöodjuren", "dinourierna", "getingarna", "humlorna", "suggorna", "badrockarna",
  "skvättarna", "pölarna", "plankorna", "propparna", "iglarna", "gråsuggorna", "bromsarna", "räkorna", "spiggen"

];

export function generateTeamName() {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adj} ${noun}`;
}

