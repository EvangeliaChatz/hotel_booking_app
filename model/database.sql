DROP TABLE public."CLIENT" CASCADE ;


DROP TABLE public."booking" CASCADE ;


DROP TABLE public."includes" CASCADE ;


DROP TABLE public."roomTypep" CASCADE ;

-- SXOLIAA
-- DROP TABLE "roomTypep" CASCADE ;
 -- DROP TABLE  public."public.client"  CASCADE ;
-- DROP TABLE  public."public.booking"  CASCADE ;
-- DROP TABLE  public."public.includes"  CASCADE ;
-- DROP TABLE  public."public.room"  CASCADE ;
-- DROP TABLE  public."public.roomTypep"  CASCADE ;
-- SXOLIAA

DROP CONSTRAINT "booking_fk11" ;


DROP CONSTRAINT "includes_fk00" ;


DROP CONSTRAINT "includes_fk11" ;


CREATE TABLE "CLIENT" ("full_name" varchar(30) NOT NULL,
																								"email" varchar(30) NOT NULL,
																								"password" varchar(255) NOT NULL,
																								"phone_number" integer NOT NULL,
																								"client_id" serial NOT NULL,
																								CONSTRAINT "client_pk" PRIMARY KEY ("client_id")) WITH (OIDS=FALSE);


CREATE TABLE "booking" ("booking_id" serial NOT NULL,
																									"total_price" integer NOT NULL,
																									"booking_date" DATE NOT NULL,
																									"client_id" integer NOT NULL,
																									"breakfast" BOOLEAN , "fastwifi" BOOLEAN , CONSTRAINT "booking_pk" PRIMARY KEY ("booking_id")) WITH (OIDS=FALSE);


CREATE TABLE "includes" ("arrival_date" DATE NOT NULL,
																										"real_arrival_date" DATE , "dep_date" DATE NOT NULL,
																										"real_dep_date" DATE , "reviews" varchar(255),
																										"booking_id" integer NOT NULL,
																										"room_id" integer NOT NULL) WITH (OIDS=FALSE);

-- CREATE TABLE "room" ("room_type_name" TEXT NOT NULL,
-- 																						"sea_view" TEXT NOT NULL,
-- 																						"kitchen" TEXT NOT NULL,
-- 																						"room_id" serial NOT NULL,
-- 																						CONSTRAINT "ROOM_pk" PRIMARY KEY ("room_id")) WITH (OIDS=FALSE);

CREATE TABLE "roomTypep" ("room_id" serial NOT NULL,
																											"room_type_photo" varchar(255) NOT NULL,
																											"room_type_description" varchar(500) NOT NULL,
																											"quests_amount" integer NOT NULL,
																											"room_type_name" varchar(255) NOT NULL,
																											"room_type_price" integer NOT NULL,
																											"availability" BOOLEAN , "room_type_id" integer NOT NULL,
																											"room_sqm" integer NOT NULL,
																											"room_photo_des" varchar(255) NOT NULL,
																											CONSTRAINT "roomTypep_pk" PRIMARY KEY ("room_id")) WITH (OIDS=FALSE);


ALTER TABLE "booking" ADD CONSTRAINT "booking_fk11"
FOREIGN KEY ("client_id") REFERENCES "client"("client_id");


ALTER TABLE "includes" ADD CONSTRAINT "includes_fk00"
FOREIGN KEY ("booking_id") REFERENCES "booking"("booking_id");


ALTER TABLE "includes" ADD CONSTRAINT "includes_fk11"
FOREIGN KEY ("room_id") REFERENCES public."roomTypep"("room_id");

