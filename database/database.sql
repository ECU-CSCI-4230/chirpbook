-- CREATE DATABASE cbook
--     WITH
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     CONNECTION LIMIT = -1;

CREATE TABLE public."User"
(
    userid bigserial NOT NULL,
    gmail text NOT NULL,
    display_name text,
    img bytea,
    profile_picture text,
    pw_hash character varying(128) NOT NULL,
    salt character varying(128) NOT NULL,
    PRIMARY KEY (userid)
)
WITH (
    OIDS = FALSE
);



ALTER TABLE public."User"
    OWNER to postgres;

CREATE TABLE public."Post"
(
    postid bigserial NOT NULL,
    userid bigint NOT NULL,
    post_text character varying(512) NOT NULL,
    time_posted timestamp
    with time zone NOT NULL DEFAULT now
    (),
    PRIMARY KEY
    (postid),
    CONSTRAINT userid FOREIGN KEY
    (userid)
        REFERENCES public."User"
    (userid) MATCH SIMPLE
        ON
    UPDATE NO ACTION
        ON
    DELETE CASCADE
)
    WITH
    (
    OIDS = FALSE
);

    ALTER TABLE public."Post"
    OWNER to postgres;

    CREATE TABLE public."Comment"
    (
        commentid bigserial NOT NULL,
        postid bigint NOT NULL,
        parent_comment bigint,
        userid bigint NOT NULL,
        comment_text character varying(512) COLLATE pg_catalog
        ."default" NOT NULL,
    time_posted timestamp
        with time zone NOT NULL DEFAULT now
        (),
    deleted boolean NOT NULL,
    CONSTRAINT "Comment_pkey" PRIMARY KEY
        (commentid),
    CONSTRAINT postid FOREIGN KEY
        (postid)
        REFERENCES public."Post"
        (postid) MATCH SIMPLE
        ON
        UPDATE NO ACTION
        ON
        DELETE CASCADE,
    CONSTRAINT userid
        FOREIGN KEY
        (userid)
        REFERENCES public."User"
        (userid) MATCH SIMPLE
        ON
        UPDATE NO ACTION
        ON
        DELETE NO ACTION
)
        WITH
        (
    OIDS = FALSE
)
TABLESPACE pg_default;

        ALTER TABLE public."Comment"
    OWNER to postgres;


        CREATE TABLE public."Tag"
        (
            postid bigint NOT NULL,
            tag text NOT NULL,
            time_tagged timestamp
            with time zone NOT NULL DEFAULT now
            (),
    CONSTRAINT "Tag_pkey" PRIMARY KEY
            (postid, tag),
    CONSTRAINT postid FOREIGN KEY
            (postid)
        REFERENCES public."Post"
            (postid) MATCH SIMPLE
        ON
            UPDATE NO ACTION
        ON
            DELETE CASCADE
)
            WITH
            (
    OIDS = FALSE
);

            ALTER TABLE public."Tag"
    OWNER to postgres;

            CREATE TABLE public."Like_Dislike"
            (
                postid bigint NOT NULL,
                userid bigint NOT NULL,
                liketype smallint NOT NULL,
                PRIMARY KEY (postid, userid),
                CONSTRAINT postid FOREIGN KEY (postid)
        REFERENCES public."Post" (postid)
                MATCH SIMPLE
        ON
                UPDATE NO ACTION
        ON
                DELETE CASCADE,
    CONSTRAINT userid FOREIGN KEY
                (userid)
        REFERENCES public."User"
                (userid) MATCH SIMPLE
        ON
                UPDATE NO ACTION
        ON
                DELETE CASCADE
)
                WITH
                (
    OIDS = FALSE
);

                ALTER TABLE public."Like_Dislike"
    OWNER to postgres;

                CREATE TABLE public."Comments_Like_Dislike"
                (
                    commentid bigint NOT NULL,
                    userid bigint NOT NULL,
                    liketype smallint NOT NULL,
                    PRIMARY KEY (commentid, userid),
                    CONSTRAINT postid FOREIGN KEY (commentid)
        REFERENCES public."Comment" (commentid)
                    MATCH SIMPLE
        ON
                    UPDATE NO ACTION
        ON
                    DELETE CASCADE,
    CONSTRAINT userid FOREIGN KEY
                    (userid)
        REFERENCES public."User"
                    (userid) MATCH SIMPLE
        ON
                    UPDATE NO ACTION
        ON
                    DELETE CASCADE
)
                    WITH
                    (
    OIDS = FALSE
);

                    ALTER TABLE public."Comments_Like_Dislike"
    OWNER to postgres;


                    CREATE TABLE public."Friend"
                    (
                        user1 bigint NOT NULL,
                        user2 bigint NOT NULL,
                        PRIMARY KEY (user1, user2),
                        CONSTRAINT user1 FOREIGN KEY (user1)
        REFERENCES public."User" (userid)
                        MATCH SIMPLE
        ON
                        UPDATE NO ACTION
        ON
                        DELETE CASCADE,
    CONSTRAINT user2
                    FOREIGN KEY
                        (user2)
        REFERENCES public."User"
                        (userid) MATCH SIMPLE
        ON
                        UPDATE NO ACTION
        ON
                        DELETE CASCADE
)
                        WITH
                        (
    OIDS = FALSE
);

                        ALTER TABLE public."Friend"
    OWNER to postgres;

                        CREATE TABLE public."Friend_Request"
                        (
                            sender bigint NOT NULL,
                            receiver bigint NOT NULL,
                            PRIMARY KEY (sender, receiver),
                            CONSTRAINT sender FOREIGN KEY (sender)
        REFERENCES public."User" (userid)
                            MATCH SIMPLE
        ON
                            UPDATE NO ACTION
        ON
                            DELETE CASCADE,
    CONSTRAINT receiver
        FOREIGN KEY
                            (receiver)
        REFERENCES public."User"
                            (userid) MATCH SIMPLE
        ON
                            UPDATE NO ACTION
        ON
                            DELETE CASCADE
)
                            WITH
                            (
    OIDS = FALSE
);

                            ALTER TABLE public."Friend_Request"
    OWNER to postgres;

                            INSERT INTO public."User"
                                (userid, gmail, pw_hash, salt)
                            VALUES
                                (0, 'redacted@redacted.com', 'e6dc7335e0ffa0d0a18261b01629701b3d310f5997f5adc73a4d921d3c7085c600d330bb412838770c09d243e90e981121eee16ba540e6c44b08680c72c70f8e', '1028b506be59d2ec9ebdccbdfbecf9a2');
