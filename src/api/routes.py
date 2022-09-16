"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

# Create Flask app
api = Blueprint('api', __name__)

# Create a route to authenticate your users (Create a Token) and return JWTs.
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    user = User.query.filter(User.email == data["email"]).first()

    if user:
        return jsonify({"msg": "Correct email"}), 200
    else:
        return jsonify({"msg": "Bad email"}), 400
    # else:
    #     access_token = create_access_token(identity=email)
    #     return jsonify({access_token})
    return "success"

@api.route("/register", methods=["POST"])
def register():
    payload = request.get_json()
    user = User(email=payload["email"], password=payload["password"], is_active=True)
    db.session.add(user)
    db.session.commit()
    
    return jsonify("User Succefully Added")

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

if __name__ == "__main__":
    app.run()