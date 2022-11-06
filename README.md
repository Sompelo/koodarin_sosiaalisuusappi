# koodarin_sosiaalisuusappi

/**
 * Heipähei ja tervetuloa koodin pariin!
 * 
 * Tämä sovellus on tarkoitettu epäsosiaalisille koodareille aktiivisuusavuksi pelillistäen sosiaalisia aktiviteettejä pistejärjestelmän avulla. 
 * Jokaisesta suoritetusta aktiviteetista saa sille määrätyn pistemäärän ja tarkoitus olisi kerätä mahdollisimman paljon pisteitä. 
 * 
 * Sovellukse toiminnot: 
 * ** Käyttäjä voi rekisteröidä itsensä sovelluksen käyttäjäksi ja kirjautua sisään. Tämä on toteutettu Firebasen autentikaatiojärjestelmällä.
 * Käyttäjätilin luonnin yhteydessä luodaan myös Firestoreen erillinen tietokanta, jossa säilytetään käyttäjän tietoja, jotka eivät sovi 
 * Firebasen käyttäjätietokantaan (kuten pisteet). 
 * 
 * ** Päänäkymässä näkyy käyttäjän pisteet ja suoritettavat aktiviteetit. Näkymässä on myös painikkeet uloskirjautumista, profiilinäkymää ja 
 * karttanäkymää varten. Näistä karttanäkymän toiminnallisuus jäi puuttumaan. 
 * 
 * ** Profiilinäkymässä käyttäjä voi tarkastella profiilinsa tietoja sekä muuttaa salasanansa. Salasanan pitää olla yli 6 merkkiä pitkä. 
 * Profiilinäkymän reaaliaikaiseen päivittymiseen tietokannasta meni paljon aikaa. Minulla oli ongelmia JavaScriptin asynkroonisen luonteen 
 * opettelussa ja useEffectin käytössä. Lopulta nämä kuitenkin ratkesivat ja profiili- ja päänäkymät päivittyvät nyt itsestään ensimmäisen 
 * renderöinnin yhteydessä. 
 * 
 * ** Puuttumaan jäi karttatoiminnallisuus, johon käyttäjä olisi voinut merkata halutessaan täpän tietyn aktiviteetin suorituksen yhteydessä.
 * Toinen puuttuva ominaisuus olisi viikottainen leaderboardi, jossa käyttäjä voisi seurata eri viikkoina saamiaan pisteitä. Pelin pisteet 
 * voisi nollata aina vaikka viikoittain. 
 * 
 * Tälläinen sovellus sitä nyt tuli tehtyä ja kyllä tästä paljon oppi, vaikka React tuntuu edelleen aika haatavalta. 
 */
