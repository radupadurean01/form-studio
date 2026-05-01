-- Move legal page content (license, privacy, cookies) into site_settings
-- so the client can edit them from /admin without touching code.
-- Each page also has an `approved` flag — while false, a "placeholder" banner
-- is shown on the public page. Admin flips it on once content is finalized.

alter table public.site_settings
  add column legal_license_html text not null default '',
  add column legal_license_approved boolean not null default false,
  add column legal_privacy_html text not null default '',
  add column legal_privacy_approved boolean not null default false,
  add column legal_cookies_html text not null default '',
  add column legal_cookies_approved boolean not null default false;

-- Backfill the existing single row with the placeholder content that used to
-- live in the .mdx files. Dollar-quoted to avoid escaping single quotes / em-dashes.
update public.site_settings set
  legal_license_html = $legal$<h1>Termeni și condiții</h1>
<p>Ultima actualizare: aprilie 2025</p>

<h2>1. Informații generale</h2>
<p>Prezentul document stabilește termenii și condițiile de utilizare a site-ului <strong>Form Studio</strong> și a serviciilor oferite prin intermediul acestuia. Prin accesarea și utilizarea site-ului, confirmați că ați citit, înțeles și acceptat acești termeni.</p>
<p><strong>Form Studio</strong> este operat de [Numele companiei], cu sediul în [Adresa completă], înregistrată la Registrul Comerțului sub nr. [J00/000/0000], CUI [00000000].</p>

<h2>2. Serviciile oferite</h2>
<p>Form Studio oferă servicii de fitness și antrenament personal, inclusiv:</p>
<ul>
<li>Acces la spațiul de antrenament și echipamente</li>
<li>Sesiuni de antrenament personal cu traineri specializați</li>
<li>Acces la zona lounge și terasă</li>
<li>Programe de antrenament personalizate</li>
</ul>

<h2>3. Abonamente și plăți</h2>
<ul>
<li>Abonamentele sunt valabile pentru perioada specificată la momentul achiziției.</li>
<li>Plata se efectuează în avans pentru perioada selectată.</li>
<li>Prețurile afișate sunt exprimate în RON și includ TVA.</li>
<li>Form Studio își rezervă dreptul de a modifica prețurile, cu notificare prealabilă de minimum 30 de zile.</li>
</ul>

<h2>4. Drepturile și obligațiile membrilor</h2>
<p>Membrii Form Studio au obligația de a:</p>
<ul>
<li>Respecta regulamentul intern al studioului</li>
<li>Utiliza echipamentele în mod corespunzător</li>
<li>Informa trainerul despre orice condiție medicală relevantă</li>
<li>Respecta programul de funcționare</li>
</ul>

<h2>5. Limitarea răspunderii</h2>
<p>Form Studio nu răspunde pentru:</p>
<ul>
<li>Accidentele cauzate de nerespectarea instrucțiunilor trainerilor</li>
<li>Pierderea sau deteriorarea obiectelor personale</li>
<li>Rezultatele individuale ale antrenamentelor</li>
</ul>

<h2>6. Rezilierea contractului</h2>
<ul>
<li>Membrul poate rezilia abonamentul cu o notificare prealabilă de 30 de zile.</li>
<li>Form Studio poate suspenda sau rezilia accesul unui membru în caz de nerespectare a regulamentului intern.</li>
</ul>

<h2>7. Contact</h2>
<p>Pentru orice întrebări legate de acești termeni, ne puteți contacta la adresa de email [email@formstudio.ro] sau la numărul de telefon [0700 000 000].</p>$legal$,

  legal_privacy_html = $legal$<h1>Politică de confidențialitate</h1>
<p>Ultima actualizare: aprilie 2025</p>

<h2>1. Introducere</h2>
<p><strong>Form Studio</strong> respectă confidențialitatea datelor dumneavoastră personale. Această politică descrie modul în care colectăm, utilizăm și protejăm informațiile personale pe care ni le furnizați prin intermediul site-ului nostru.</p>

<h2>2. Date colectate</h2>
<p>Colectăm următoarele categorii de date personale:</p>
<ul>
<li><strong>Date de identificare:</strong> nume, adresă de email</li>
<li><strong>Date de contact:</strong> număr de telefon, adresă</li>
<li><strong>Date furnizate prin formularul de contact:</strong> numele, adresa de email și mesajul transmis</li>
<li><strong>Date tehnice:</strong> adresa IP, tipul browserului, paginile vizitate (prin intermediul cookie-urilor)</li>
</ul>

<h2>3. Scopul prelucrării</h2>
<p>Datele personale sunt prelucrate în următoarele scopuri:</p>
<ul>
<li>Răspunderea la solicitările transmise prin formularul de contact</li>
<li>Gestionarea relației cu membrii studioului</li>
<li>Îmbunătățirea serviciilor și a experienței pe site</li>
<li>Comunicări legate de abonamente și servicii</li>
</ul>

<h2>4. Temeiul juridic</h2>
<p>Prelucrarea datelor se bazează pe:</p>
<ul>
<li><strong>Consimțământul dumneavoastră</strong> — pentru formularul de contact</li>
<li><strong>Executarea contractului</strong> — pentru gestionarea abonamentelor</li>
<li><strong>Interesul legitim</strong> — pentru îmbunătățirea serviciilor</li>
</ul>

<h2>5. Durata stocării</h2>
<p>Datele personale sunt stocate pe durata necesară îndeplinirii scopurilor menționate:</p>
<ul>
<li>Date din formularul de contact: maximum 12 luni</li>
<li>Date ale membrilor: pe durata abonamentului + 3 ani după încetare</li>
<li>Date tehnice (cookie-uri): conform politicii de cookie-uri</li>
</ul>

<h2>6. Drepturile dumneavoastră</h2>
<p>Conform GDPR, aveți următoarele drepturi:</p>
<ul>
<li>Dreptul de acces la datele personale</li>
<li>Dreptul la rectificarea datelor inexacte</li>
<li>Dreptul la ștergerea datelor („dreptul de a fi uitat")</li>
<li>Dreptul la restricționarea prelucrării</li>
<li>Dreptul la portabilitatea datelor</li>
<li>Dreptul de opoziție</li>
</ul>
<p>Pentru exercitarea acestor drepturi, contactați-ne la [email@formstudio.ro].</p>

<h2>7. Securitatea datelor</h2>
<p>Implementăm măsuri tehnice și organizatorice adecvate pentru protejarea datelor personale împotriva accesului neautorizat, pierderii sau distrugerii.</p>

<h2>8. Transferul datelor</h2>
<p>Datele pot fi stocate pe servere situate în Uniunea Europeană prin intermediul furnizorilor noștri de servicii (Supabase, Vercel).</p>

<h2>9. Contact</h2>
<p>Pentru orice întrebări legate de prelucrarea datelor personale, ne puteți contacta la [email@formstudio.ro].</p>$legal$,

  legal_cookies_html = $legal$<h1>Politică cookies</h1>
<p>Ultima actualizare: aprilie 2025</p>

<h2>1. Ce sunt cookie-urile?</h2>
<p>Cookie-urile sunt fișiere text de mici dimensiuni stocate pe dispozitivul dumneavoastră atunci când vizitați un site web. Acestea permit site-ului să vă recunoască dispozitivul și să rețină anumite informații despre vizita dumneavoastră.</p>

<h2>2. Cookie-uri utilizate</h2>
<h3>Cookie-uri esențiale</h3>
<p>Aceste cookie-uri sunt necesare pentru funcționarea site-ului și nu pot fi dezactivate.</p>
<ul>
<li><strong>Sesiune de autentificare</strong> — pentru zona de administrare (doar pentru administratori)</li>
<li><strong>Preferințe</strong> — pentru a reține setările de bază ale site-ului</li>
</ul>
<h3>Cookie-uri analitice</h3>
<p>Utilizăm cookie-uri analitice pentru a înțelege cum este utilizat site-ul nostru:</p>
<ul>
<li><strong>[Vercel Analytics / Plausible]</strong> — colectează date anonime despre vizite, paginile accesate și performanța site-ului</li>
</ul>

<h2>3. Gestionarea cookie-urilor</h2>
<p>Puteți controla și/sau șterge cookie-urile după preferință. Puteți șterge toate cookie-urile care sunt deja pe dispozitivul dumneavoastră și puteți seta majoritatea browserelor să blocheze plasarea acestora.</p>
<h3>Cum să gestionați cookie-urile în browser:</h3>
<ul>
<li><strong>Chrome:</strong> Setări → Confidențialitate și securitate → Cookie-uri</li>
<li><strong>Firefox:</strong> Opțiuni → Confidențialitate și securitate</li>
<li><strong>Safari:</strong> Preferințe → Confidențialitate</li>
<li><strong>Edge:</strong> Setări → Cookie-uri și permisiuni site</li>
</ul>

<h2>4. Cookie-uri terțe</h2>
<p>Site-ul nostru poate conține link-uri către site-uri terțe (Instagram, App Store, Google Play) care au propriile politici de cookie-uri.</p>

<h2>5. Actualizări</h2>
<p>Această politică poate fi actualizată periodic. Vă recomandăm să o consultați regulat.</p>

<h2>6. Contact</h2>
<p>Pentru întrebări despre cookie-urile utilizate, contactați-ne la [email@formstudio.ro].</p>$legal$;
