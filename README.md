# Ilmastonmuutosgraafeja Reactilla, ryhmä 3

Tämä on ryhmän numero 3 esittelyteksti kevään 2023 web-ohjelmoinnin sovellusprojektista. Ryhmän jäseniä ovat Tero Rantanen, Janita Kaikkonen, Alisa Kulonpää ja Art Karimäki. Aiheeksi annettiin tehdä React-websovellus, joka sisältää viisi erilaista visualisointia erilaisista ilmastonmuutoksesta kertovista datatauluista. Lisäksi sovelluksessa on kirjautumismahdollisuus, ja käyttäjä voi tallentaa itselleen oman näkymän kaavioista. Sovelluksessa käytettiin Javaa palvelinpuoleen ja ReactJS käyttöliittymään. Sovellus on julkisessa netissä nähtävillä osoitteessa:  xxxx
## Projektin vaiheet ja vastuualueet
Projektin ensimmäisillä viikoilla kaikille jaettiin tehtäväksi tutustua Reactin kaavioihin, jaettiin viiden eri kaavioinnin visualisointien toteutus, tutustuttiin ja kerättiin data tietokantaan. Samassa alettiin käyttämään kanban-mallia työtehtävien jakoon. Kanban-mallia pidettiin mahdollisimman ajantasalla ja sinne lisättiin tehtäviä sitä mukaa, kun niitä suunniteltiin. Tehtävän perään kirjattiin oma nimi, kun otti sen työn alle.

### Teron (t1rate01) vastuualueet
Teron vastuut alkoivat alussa visualisoinnilla 5, ja kaiken tietokantaan päätyvän datan keräämisen ja sopivaan muotoon kääntämisen parissa Janitan kanssa. Seuraavaksi käyttöliittymän logiikan suunnittelua ja visualisointi 2. Omiin visualisointeihin liittyvät backend ja frontend toiminnallisuudet ja alustava html/css muotoilu.  

Kun käyttöliittymästä oli karkea demo valmis, siirtyi tekemään käyttäjien rekisteröintiin, kirjautumiseen, autentikointiin ja poistoon tarvittavat backend-toiminnot. Tämän jälkeen lyötiin lopullinen käyttöliittymäsuunnitelma lukkoon, Janita toteutti suunnitelman kaavion piirron ja Tero toteutti logiikan, jolla käyttöliittymässä liikuttiin ja toimittiin. Tämän jälkeen rekisteröinti, kirjautuminen ja valikot frontendissä, sekä komponentti, joka käyttäjän asetusten mukaan tuo halutut visualisoinnit näkymään, jaettavan linkin logiikka, linkin mukaan toimiva komponentti ja meidän "browserbariksi" nimeämä komponentti joka valvoo mm. käyttäjän kirjautumisen tilaa ja sallii/siirtää sivujen välillä ja näyttää ehtojen mukaan tiettyjä nappeja.  

Projektin lopussa auttoi Alisaa backendin testauskoodien kanssa ja toteutti frontendin testauksen koodin. Toteutti myös lopullisen deploymentin.
Tarjosi tukea muille ohjelmoinnissa.  
  
### Janitan (*saattaja*) vastuualueet
Janitan vastuut alkoivat visuaaleilla 1, 2 ja PostqreSQL-tietokannan perustaminen ja kaiken datan hallinnointi ja kääntäminen. Datan keruu ja oikeaan muotoon kääntäminen vei paljon aikaa, joten töitä jaettiin ja tehtiin yhteistyössä Teron kanssa. Piti myös yllä kanban-mallia ja siellä olevia tehtäviä.  
  
Tehtäväksi jäi visual 1 backend rest-toiminnot ja frontend toteutukset. Visualisoinnissa lämpötiladata on jaettu kahteen kaavioon, kuukausittainen ja vuosittainen, joita voi vaihdella radionappeja käyttäen. Vuosikaavio sisältää myös "Temperature reconstruction"-datan. 
  
Janita teki käyttöliittymäsuunnitelman ensimmäisen karkean vaiheen suunnittelun ryhmän kanssa ja alustavat kaaviot. Myöhemmin lopullisen käyttöliittymän ja sen logiikan suunnittelu Teron kanssa ja siitä kaavion teko. Toteutti myös RESTAPI-kaavion/suunnitelman.  
  
Suurin osa koko projektin lopullisista html/css muotoiluista yhtenäiseksi kuului myös Janitalle.  
  
Testasi deploymenttia, mutta vain backend osuus onnistui, joten tämä vaihe jäi muille lopullisesti. 
  
### Alisan (*akulonpa*) vastuualueet
Alisa toimi alussa ensisijaisena muistiinpanojen kerääjänä palavereissa, teki palaveritaulukot joilla seurattiin aikoja, jolloin kukin on vapaa esim. palaverinpitoon. 
  
Alisan vastuut alkoi visualisoinnilla 3, sen backend rest-toiminnot ja frontend toiminnallisuudet ja muotoilu. Visualisointi 3 on viivakaavio kolmesta eri taulukosta, jotka kuvaavat maapallon lämpötilan kehistystä viimeisen kahden miljoonan vuoden aikana.  
  
Jatkoi tästä testaamisen materiaaliin tutustumiseen ja harjoitteluun, toteutti backendin testaamisen. 
Auttoi lopullisen muotoilun ja popup-ikkunoiden muotoilujen toteutuksissa, ja osallistui yleisesti paljon ongelmanratkontaan.  

### Artin (*cerveku*) vastuualueet
Artin vastuut alkoi visualisoinnista 4, sen backend ja frontend toiminnallisuuksien tuottamisesta. 
Visualisointi 4 sisältää kaavion jolla kuvataan jokaisen maan valtiolta kerättyä dataa eri vuosilta. Datan käsittely vaati paljon parsimista sen tietokantaan ajamiseen käytetystä scriptistä johtuen. Kuvaajaan lisätään maita dropdown-valikosta. 
  
Osallistui eri popupikkunoiden ja jakotoimintojen toteutukseen.  

Testasi ja auttoi sovelluksen deployment-vaiheessa.
  
## Sovelluksen käyttö
![Photo](https://github.com/TVT22KMO-WP-GROUP-3/R3-Projekti/blob/t1rate01-deploymenfromMainAsItIs/photosForReadMe/kaytto1.png?raw=true)
> Etusivunäkymä

Käyttäjän näkökulmasta sovellus alkaa aina etusivulta, jolle arvotaan yksi viidestä visualisoinnista näkyviin ja ylhäällä on "browserbar", joka sisältää nappeja rekisteröitymiseen, kirjautumiseen ja "Show all" näkymään jossa kuka tahansa näkee kaikki visualisoinnit.

Käyttäjän rekisteröidyttyä tämä ohjataan kirjautumaan sisään. Sisäänkirjautumisen yhteydessä sovellus tarkistaa onko käyttäjä uusi käyttäjä, vai onko hänellä jo aiempia näkymäasetuksia tallennettuna. Jos käyttäjä on uusi/näkymiä ei ole, käyttäjä ohjataan suoraan valikkoon, jossa sellaisen voi luoda. 

![Photo](https://github.com/TVT22KMO-WP-GROUP-3/R3-Projekti/blob/t1rate01-deploymenfromMainAsItIs/photosForReadMe/options.png?raw=true)
> Näkymänluontivalikko. Käyttäjä voi "rasti ruutuun" periaatteella valita visualisoinnit, jotka haluaa nähdä ja valita niille asettelun.

Näkymänsä luotua käyttäjä ohjataan sivulle, jossa halutut näkymät piirretään. Samassa käyttäjällä on mahdollisuus painaa yläpalkista "Share" nappia, jolloin saadaan linkki, jonka voi jakaa kenelle tahansa ja pääsee samaan näkymään. Muita toimintoja valikoissa on tehdyn näkymän poistaminen ja käyttäjätilin poistaminen.

## Käyttöliittymän logiikka, tietokanta, RestAPI
Käyttäjälle näkyvä ohjelma on toteutettu React.js komponentein. Jokaisella sivulla näkyvä "BrowserBar" komponentti hoitaa käyttäjän kirjautumisen tilan valvonnan ja tarvittavan uudelleenohjauksen. BrowserBar sisältää myös logiikkaa, jolla eri näkymissä näytetään eri nappeja toimintoineen, kuten kirjautumisen toiminnot ja linkin jaon toiminnot. Käyttäjän kirjauduttua backendistä saatu tokeni tallennetaan paikallismuistiin, ja browserbar valvoo sen tilaa, jotta tietää käyttäjän kirjautumisen tilan.
  
![Photo](https://github.com/TVT22KMO-WP-GROUP-3/R3-Projekti/blob/t1rate01-deploymenfromMainAsItIs/photosForReadMe/browserbarReturn.png?raw=true)

Arvottua näkymää ja käyttäjän valitsemien näkymien näyttämistä varten on luotu oma "render" komponentti, jolle annetaan suunnitteluvaiheessa sovittu 6 numeroa pilkulla erotettuna sisältävä stringi, jota render lukee kuin se olisi binäärimuodossa oleva true/false taulukko. 5 ensimmäistä indexiä vastaa kukin yhtä visualisointia ja kuudes indexi asettelua vertikaalisesti tai horisontaalisesti. 

![Photo](https://github.com/TVT22KMO-WP-GROUP-3/R3-Projekti/blob/t1rate01-deploymenfromMainAsItIs/photosForReadMe/renderjs.png)
> Esimerkki miten viidennen indexin/kuudennen numeron ollessa 1, palautetaan horisontaalisessa näkymässä visualisointeja.

Valikossa, jossa näkymiä luodaan, käytetään checkboxeja joilla käännetään taulukon lukuja vastaavilla indexeillä nolla ykköseksi ja tallennuksen yhteydessä se tallennetaan ja välitetään renderille. 

Linkin jakonappia painaessa ohjelma luo satunnaisen id:n ja tallentaa sen tietokantaan tokenilla autentikoituna sille tarkoitettuun tauluun. Backend purkaa tokenista myös käyttäjän käyttäjänimen, jolloin linkin käyttäjän mennessä katsomaan linkin näkymää, voidaan näyttää, keneltä näkymä on. Linkki ohjaa frontendissa komponenttiin, joka purkaa urlin perästä id:n ja hakee sen perusteella tietokannasta näkymän samassa kuusinumeroisessa muodossa, joka syötetään samaan renderiin ja käyttäjänimen, joka näytetään myös.

Jokainen visualisointi hakee tietokannasta niille yksilöidysti tehdyistä rest päätteistä tietonsa. Visualisoinnit ovat peruslogiikaltaan samanlaisia, osa kaavioista on esimerkiksi viivakaavioita tai piirakkakaavioita, joissa ohjelmalliset erot tulevat. Esimerkkinä visualisointi 1, joka ensimmäisenä Reactin useEffect ja useState hookkeja hyödyntäen hakee tarvitsemansa datan taulukkomuodossa, käyttää .map toimintoa sen uudelleenjärjestelyyn, tässä tapauksessa x ja y arvoihin kyseisen kaavion akseleita varten.

![Photo](https://github.com/TVT22KMO-WP-GROUP-3/R3-Projekti/blob/t1rate01-deploymenfromMainAsItIs/photosForReadMe/visu1.png?raw=true)  

Yllä olevassa visualisoinnissa on haluttu tarjota kahta erilaista viivakaaviota valittavaksi, joten varsinaisella visual1.js komponentilla palautetaan radionappien kanssa ehdollisesti molempien kaavioiden komponenttien kutsu, mutta vain toinen näkyy kerrallaan. Itse ohjelma kutsuu tämän kohdalla visual1.jssää.  
  
Sovelluksen backend sisältää visuaalikomponenteille jokaiselle yksilöidyt restcontrollerit serviceluokkineen. Lisäksi backendiin on tehty käyttäjän kirjautumista varten käyttäjien rest ja servicecontrollerit, sekä autentikointiin liittyvät servicet ja toiminnot.

Sovelluksen tietokanta on perustettu PostqreSQL palvelimelle ja sinne on kerätty ja käännetty datasetit ensisijaisesti csv muodossa. Suurin osa datasta on täytynyt kääntää joko esimerkiksi "MySQL Workbench" sovelluksesta löytyvillä toiminnoilla, tai erilaisia python-scriptejä hyväksikäyttäen, joko kerralla tai osissa.
Iso osa datasta ajettiin sisään tietokannan client-sovelluksen avulla, ja loput yhdistämällä Visual Studio Coden database lisäosa tietokantaan ja antamalla data SQL komennoin/scripteillä.

## Haasteet ja opittua
Ryhmän jokaiselle jäsenelle tuli uutena datasettien keruu ja kääntäminen pääasiassa csv muotoon. Kaikki käyttivät myös ensimmäistä kertaa tietokantaa localhostin ulkopuolella ja projektin siihen yhdistäminen oli uutta. Reactin chartjs ja chartjs-2 kirjastot haastoivat myöskin itseopiskeluun ja materiaalinhakuun. Visual Studio Codea käytettäessä opittiin paljon terminaalitarkkaavaisuutta, erityisesti npm paketteja asentaessa, ja niiden kanssa väärin toimiessa aiheutuvien hämmentävien virheilmoituksien kanssa toimimista. Yhteistyöstäkin opittiin paljon, ja siitä miten tärkeää on hahmotella suunnitelmia mahdollisimman alussa projektia edes karkeasti, jotta loppua kohden eri komponenttien yhtenäistäminen tai eri vaiheiden suunnittelu helpottuisi. Jatkossa myös halutaan varmasti sopia esimerkiksi .css muotoiluun liittyvien nimikkeiden käytöstä ohjelman perusrunkoa koodatessa. Projekti kehitti kaikkia myös ongelmanratkonnassa ja omatoimisessa opettelussa.
