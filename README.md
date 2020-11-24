WORK IN PROGRESS.

TODO

Mini MVP:
---------

- [ ] /cat <kissan_nimi> (lisää uusi kissa) --> jos olemassa jo, ei kelpaa
- [ ] /task <taskin_nimi> (esim. "clean_toiletz") (lisää uusi task yleinen)
- [ ] /task <taskin_nimi> <kissan_nimi> (lisää uusi kissakohtainen task) --> jos kissaa ei ole, ei kelpaa

- [ ] /icanhaz <task> (merkitse task tehdyksi tälle päivälle)
- [ ] /canihaz (luettelee päivän task tilastot)

Proper MVP:
-----------

- [ ] /cat <kissan_nimi> (lisää uusi kissa) --> jos olemassa jo, ei kelpaa
- [ ] /task <taskin_nimi> <deadline> (esim. "clean_toiletz" ja "23") (lisää uusi task, yleinen, tee klo x mennessä tai tulee varoitus)
- [ ] /task <taskin_nimi> <kissan_nimi> (lisää uusi kissakohtainen task) --> jos kissaa ei ole, ei kelpaa

- [ ] /icanhaz <task> (merkitse task tehdyksi tälle päivälle)
- [ ] /canihaz (luettelee päivän task tilastot)

- [ ] klo x -> lähettää vihaisen muistutuksen jos task tekemättä
- [ ] klo x -> lähettää iloisen viestin jos kaikki päivän taskit tehty

Nice to have:
-------------

- [ ] /cat <kissan_nimi> angry --> pyytää <kissan_kuva>-tiedoston
- [ ] /cat <kissan_nimi> happy --> pyytää <kissan_kuva>-tiedoston
- [ ] /catz (luettelee kaikki kissat)
- [ ] /canihaz <taskin_nimi> (ilmoittaa onko kyseinen task tehty)

- [ ] klo x -> lähettää vihaisen muistutuksen jos task tekemättä + syyllistävän kissakuvan (random kuva tai kuva kissasta jota task koskee)
- [ ] klo x -> lähettää iloisen viestin jos kaikki päivän taskit tehty + random iloisen kissakuvan


# General things

This bot is made using [Telegraf](https://telegraf.js.org/#/), Telegram bot framework for Node.js. 

 