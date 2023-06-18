select * from "public.ROOM_TYPE";


DROP TABLE  public."client"  CASCADE ;

CREATE TABLE "client" (
	"full_name" varchar(30) NOT NULL,
	"email" varchar(30) NOT NULL,
	"password" varchar(255) NOT NULL,
	"phone_number" integer NOT NULL,
	"client_id" serial NOT NULL,
	CONSTRAINT "CLIENT_pk" PRIMARY KEY ("client_id")
) WITH (
  OIDS=FALSE
);




