import sqlite3
from config.env import ENV

class UserSchema:
    def __init__(self, db_path):
        self.__db_path = db_path
        db = sqlite3.connect(self.__db_path)

        # Create users schema
        db.execute("""
        CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        username TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
         );
        """)

        db.execute("""
        CREATE TRIGGER IF NOT EXISTS update_user_timestamp 
        AFTER UPDATE ON users
        FOR EACH ROW
        BEGIN
            UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE user_id = OLD.user_id;
        END;
        """)

        db.close()

    def insert(self, first_name, last_name, email, password_hash, username):
        db = sqlite3.connect(self.__db_path)
        cr = db.cursor()

        sql = """
            INSERT INTO users (first_name, last_name, email, password_hash, username)
            VALUES (?, ?, ?, ?, ?)
            RETURNING *;
            """
        try:
            # Insert a new user 
            cr.execute(sql, (first_name, last_name, email, password_hash, username))
            new_user = cr.fetchone()
            db.commit()
            print("User created successfully!")
            return new_user
        except sqlite3.IntegrityError as e:
            print(f"Database error: {e}")
        finally:
            db.close()

    def update(self, user_id, first_name=None, last_name=None, password_hash=None):
        db = sqlite3.connect(self.__db_path)
        cr =db.cursor()

        name_sql = """
        UPDATE users SET first_name = ?, last_name = ?
        WHERE user_id = ?
        """
        password_hash_sql = """
        UPDATE users SET password_hash = ?
        WHERE user_id = ?
        """
        print(user_id)
        try:
            # Update the password
            if first_name and last_name:
                cr.execute(name_sql, (first_name, last_name, user_id))
            elif password_hash:
                cr.execute(password_hash_sql, (password_hash, user_id))
            
            db.commit()

            # Select the user with the id 
            cr.execute("SELECT * FROM users WHERE user_id = ?", (user_id,))
            user = cr.fetchone()
            return user
        except sqlite3.IntegrityError as e:
            print(f"Database error: {e}")
        finally:
            db.close()

    def delete(self, user_id):
        db = sqlite3.connect(self.__db_path)
        cr =db.cursor()
        sql = """
        DELETE FROM users
        WHERE user_id = ?;
        """

        try:
            # Delete the user with a user_id
            cr.execute(sql, (user_id,))
            db.commit()

            # Select the user with the id 
            cr.execute("SELECT * FROM users WHERE user_id = ?", (user_id,))
            user = cr.fetchone()

            if not user: return "User deleted successfully!" 
            return user
        except sqlite3.IntegrityError as e:
            print(f"Database error: {e}")
        finally:
            db.close()

    def find_by_id(self, user_id):
        db = sqlite3.connect(self.__db_path)
        cr = db.cursor() 

        sql = """
        SELECT * FROM users
        WHERE user_id = ? LIMIT 1;
        """    

        try:
            cr.execute(sql, (user_id,))
            user = cr.fetchone()
            return user
        except sqlite3.IntegrityError as e:
            print(f"Database error: {e}")
        finally:
            db.close()

    def find_by_email(self, email):
        db = sqlite3.connect(self.__db_path)
        cr = db.cursor() 

        sql = """
        SELECT * FROM users
        WHERE email = ? LIMIT 1;
        """    

        try:
            cr.execute(sql, (email,))
            user = cr.fetchone()
            return user
        except sqlite3.IntegrityError as e:
            print(f"Database error: {e}")
        finally:
            db.close()

User = UserSchema(ENV["DATABASE_URL"])
