#!/usr/bin/env python3

import os

from flask import Flask, render_template

app = Flask(__name__)

import logging, sys
logging.basicConfig(stream=sys.stderr)

@app.route('/')
def root():
	return render_template('index.html', projects=os.listdir(os.path.dirname(__file__) + "/templates/projects"))

@app.route('/projects/<project>')
def projects(project):
	return render_template('projects/' + project.lower() + '/index.html')

