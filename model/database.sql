
DROP TABLE  public."CLIENT"  CASCADE ;
DROP TABLE  public."BOOKING"  CASCADE ;
DROP TABLE  public."INCLUDES"  CASCADE ;
DROP TABLE  public."ROOM"  CASCADE ;
DROP TABLE  public."ROOM_TYPE"  CASCADE ;


-- DROP TABLE  public."public.CLIENT"  CASCADE ;
-- DROP TABLE  public."public.BOOKING"  CASCADE ;
-- DROP TABLE  public."public.INCLUDES"  CASCADE ;
-- DROP TABLE  public."public.ROOM"  CASCADE ;
-- DROP TABLE  public."public.ROOM_TYPE"  CASCADE ;

CREATE TABLE "CLIENT" (
	"full_name" varchar(30) NOT NULL,
	"email" varchar(30) NOT NULL,
	"password" varchar(30) NOT NULL,
	"phone_number" integer NOT NULL,
	"client_id" serial NOT NULL,
	CONSTRAINT "CLIENT_pk" PRIMARY KEY ("client_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "BOOKING" (
	"booking_id" serial NOT NULL,
	"total_price" integer NOT NULL,
	"booking_date" DATE NOT NULL,
	"client_id" integer NOT NULL,
	"breakfast" BOOLEAN ,
	"fastwifi" BOOLEAN ,
	CONSTRAINT "BOOKING_pk" PRIMARY KEY ("booking_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "INCLUDES" (
	"arrival_date" DATE NOT NULL,
	"real_arrival_date" DATE NOT NULL,
	"dep_date" DATE NOT NULL,
	"real_dep_date" DATE NOT NULL,
	"reviews" varchar(255) NOT NULL,
	"booking_id" integer NOT NULL,
	"room_id" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "ROOM" (
	"room_type_name" TEXT NOT NULL,
	"sea_view" TEXT NOT NULL,
	"kitchen" TEXT NOT NULL,
	"room_id" serial NOT NULL,
	CONSTRAINT "ROOM_pk" PRIMARY KEY ("room_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "ROOM_TYPE" (
	"room_id" serial NOT NULL,
	"room_type_photo" varchar(255) NOT NULL,
	"room_type_description" varchar(500) NOT NULL,
	"quests_amount" integer NOT NULL,
	"room_type_name" varchar(255) NOT NULL,
	"room_type_price" FLOAT NOT NULL,
	"room_photo_des" varchar(255) NOT NULL,
	CONSTRAINT "ROOM_TYPE_pk" PRIMARY KEY ("room_id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "BOOKING" ADD CONSTRAINT "BOOKING_fk1" FOREIGN KEY ("client_id") 	REFERENCES "CLIENT"("client_id");
ALTER TABLE "INCLUDES" ADD CONSTRAINT "INCLUDES_fk0" FOREIGN KEY ("booking_id") 	REFERENCES "BOOKING"("booking_id");
ALTER TABLE "INCLUDES" ADD CONSTRAINT "INCLUDES_fk1" FOREIGN KEY ("room_id") 	REFERENCES "ROOM_TYPE"("room_id");






