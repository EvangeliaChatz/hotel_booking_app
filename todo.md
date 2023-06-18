

- TON ΕΛΕΓΧΟ ΑΝ ΥΠΑΡΧΕΙ ΔΙΑΘΕΣΙΜΟ ΔΩΜΑΤΙΟ (να εμφανίζει ολα τα δωμάτια
με booking id, στις ημερομηνίες που έκανε input ο χρήστης checkin<= checkin input <= checkout )









-μηνύματα λάθους
- να εμφανιζονται τα booking στο προφιλ --να εμφανίζεται και το πρωινό


-validation formas--bootstrapt
-validation φόρμας booking--checkbox, αν δεν το εχει πατησει να μην
μπορεί να συνεχίσει

-env arxeio
 -eiditingBookingContnet updating the reservations 


--------------------------------------------------------
REVIEWS
-να δω το write message ξανά που έχω φτιάξει να αλλάζει ανάλογα τα δωμάτια και τα άτομα
-διαγραφή και update στα στοιχεια του προφιλ 
-εισαγωγή σχολίων στο room description
- πλήθος των σχολίων στο bookling list

PRWINO
-na balw emfwleumena if
--------------------------------------------------------
-random reviews στην αρχική
-να ελέξγω όλα τα link
-να αλλάζει το κουμπί CHECK AVAILABILITY στη booking και
να γίνεται ΑΝΑΝΕΩΣΗ ΣΤΟΙΧΕΙΩΝ




----------
- sign up--DONE
-CONTROLLERS & ROUTES για ΟΡΓΑΝΩΣΗ ΑΡΧΕΙΟΥ--DONE
- να εμφανίζεται στο pop up του room description η συνολική τιμή--DONE
- logout CSS--DONE
- logout είναι πολύ απότομο--DONE
- BOOK NOW handlebars διαγραφή
-redirect home από το log out--DONE
POST BOOKING--DONE- και τα reviews ( ειναι στα incluedes)--DONE
-στην profile page να εμφανίζονται τα στοιχεία του session--DONE
-και επίσης να εμφανίζονται αυτόματα όταν πάει να κάνει booking αυτός που 
είναι συνδεδεμένος--DONE



ΠΑΡΑΤΗΡΗΣΕΙΣ
-χρειάζεται sign in για να κάνω booking
-δεν έχει υλοποιηθεί η κράτηση δωματίου από κινητό , από το room description
-στο booking Pop up η τιμή του πρωϊνού είναι fix- ενώ θα έπρεπε 
--DEN EXEI GINEI - στην booking list -guests selection checkbox problem---


- βαση postgress στο heroku / docker 
- να φτιαξω το database.sql 




Database Credentials
Get credentials for manual connections to this database.

Cancel
Please note that these credentials are not permanent.

Heroku rotates credentials periodically and updates applications where this database is attached.

Host
ec2-54-73-22-169.eu-west-1.compute.amazonaws.com
Database
d9km1a1askpmap
User
fqrnsatlpwwohl
Port
5432
Password
fc696d0c1dd639fba7cf508debc792bcb25c1cb1fb57c62ae1b71b510cb0244d
URI
postgres://fqrnsatlpwwohl:fc696d0c1dd639fba7cf508debc792bcb25c1cb1fb57c62ae1b71b510cb0244d@ec2-54-73-22-169.eu-west-1.compute.amazonaws.com:5432/d9km1a1askpmap
heroku pg:psql postgresql-rectangular-96118 --app hotelbookingapp