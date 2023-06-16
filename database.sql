CREATE TABLE "public.CLIENT" (
	"full_name" varchar(30) NOT NULL,
	"email" varchar(30) NOT NULL,
	"password" varchar(30) NOT NULL,
	"phone_number" integer NOT NULL,
	"client_id" integer NOT NULL,
	CONSTRAINT "CLIENT_pk" PRIMARY KEY ("client_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.BOOKING" (
	"booking_id" serial NOT NULL,
	"total_price" integer NOT NULL,
	"booking_date" DATE NOT NULL,
	"extra_id" integer NOT NULL,
	CONSTRAINT "BOOKING_pk" PRIMARY KEY ("booking_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.DOES" (
	"client_id" integer NOT NULL,
	"booking_id" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.INCLUDES" (
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



CREATE TABLE "public.ROOM" (
	"room_type_name" TEXT NOT NULL,
	"sea_view" TEXT NOT NULL,
	"kitchen" TEXT NOT NULL,
	"room_id" serial NOT NULL,
	CONSTRAINT "ROOM_pk" PRIMARY KEY ("room_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.ROOM_TYPE" (
	"room_type_photo" varchar(255) NOT NULL,
	"room_type_description" varchar(255) NOT NULL,
	"quests_amount" integer NOT NULL,
	"room_type_name" varchar(255) NOT NULL,
	"room_type_price" FLOAT NOT NULL,
	"availability" BOOLEAN NOT NULL,
	"room_type_id" serial NOT NULL,
	"room_id" integer NOT NULL,
	CONSTRAINT "ROOM_TYPE_pk" PRIMARY KEY ("room_type_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.EXTRAS" (
	"extra_type" varchar(30) NOT NULL,
	"extra_price" integer NOT NULL,
	"booking_id" integer NOT NULL,
	"extra_id" integer NOT NULL,
	CONSTRAINT "EXTRAS_pk" PRIMARY KEY ("extra_id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "BOOKING" ADD CONSTRAINT "BOOKING_fk0" FOREIGN KEY ("extra_id") REFERENCES "EXTRAS"("extra_type");

ALTER TABLE "DOES" ADD CONSTRAINT "DOES_fk0" FOREIGN KEY ("client_id") REFERENCES "CLIENT"("client_id");
ALTER TABLE "DOES" ADD CONSTRAINT "DOES_fk1" FOREIGN KEY ("booking_id") REFERENCES "BOOKING"("booking_id");

ALTER TABLE "INCLUDES" ADD CONSTRAINT "INCLUDES_fk0" FOREIGN KEY ("booking_id") REFERENCES "BOOKING"("booking_id");
ALTER TABLE "INCLUDES" ADD CONSTRAINT "INCLUDES_fk1" FOREIGN KEY ("room_id") REFERENCES "ROOM"("room_id");


ALTER TABLE "ROOM_TYPE" ADD CONSTRAINT "ROOM_TYPE_fk0" FOREIGN KEY ("room_id") REFERENCES "ROOM"("room_id");

ALTER TABLE "EXTRAS" ADD CONSTRAINT "EXTRAS_fk0" FOREIGN KEY ("booking_id") REFERENCES "BOOKING"("booking_id");


INSERT INTO "EXTRAS" ("extra_id", "extra_type", "extra_price")
VALUES (1,'fastwifi', 8), (2,'breakfast', 10);