select * from "public.ROOM_TYPE";


DROP TABLE  public."booking"  CASCADE ;


CREATE TABLE "booking" (
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


