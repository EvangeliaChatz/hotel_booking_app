select * from "public.ROOM_TYPE";

Select * from "roomTypep"  WHERE "quests_amount" >= $1
and 
"room_id" not in (select "room_id" from includes where "arrival_date" between $2 and $3 and "departure_date" between $2 and $3)


Select * from "roomTypep"  WHERE "quests_amount" >= 2
and 
"room_id" not in (select "room_id" from includes where "arrival_date" between '2023-06-10' and '2023-07-15' and "dep_date" between '2023-06-10' and '2023-07-15');

