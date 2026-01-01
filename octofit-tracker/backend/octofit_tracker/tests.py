# FILE: octofit-tracker/backend/octofit_tracker/tests.py

from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout
from bson import ObjectId
from datetime import timedelta

class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            _id=ObjectId(),
            username='testuser',
            email='testuser@octofit.edu',
            password='testpassword'
        )

    def test_user_creation(self):
        self.assertEqual(self.user.username, 'testuser')
        self.assertEqual(self.user.email, 'testuser@octofit.edu')

class TeamModelTest(TestCase):
    def setUp(self):
        self.team = Team.objects.create(
            _id=ObjectId(),
            name='Test Team'
        )

    def test_team_creation(self):
        self.assertEqual(self.team.name, 'Test Team')

class ActivityModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            _id=ObjectId(),
            username='testuser',
            email='testuser@octofit.edu',
            password='testpassword'
        )
        self.activity = Activity.objects.create(
            _id=ObjectId(),
            user=self.user,
            activity_type='Running',
            duration=timedelta(hours=1)
        )

    def test_activity_creation(self):
        self.assertEqual(self.activity.activity_type, 'Running')
        self.assertEqual(self.activity.user, self.user)

class LeaderboardModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            _id=ObjectId(),
            username='testuser',
            email='testuser@octofit.edu',
            password='testpassword'
        )
        self.leaderboard = Leaderboard.objects.create(
            _id=ObjectId(),
            user=self.user,
            score=100
        )

    def test_leaderboard_creation(self):
        self.assertEqual(self.leaderboard.score, 100)
        self.assertEqual(self.leaderboard.user, self.user)

class WorkoutModelTest(TestCase):
    def setUp(self):
        self.workout = Workout.objects.create(
            _id=ObjectId(),
            name='Morning Run',
            description='A refreshing morning run'
        )

    def test_workout_creation(self):
        self.assertEqual(self.workout.name, 'Morning Run')
        self.assertEqual(self.workout.description, 'A refreshing morning run')

class APITestCase(APITestCase):
    def test_api_root(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)
        self.assertIn('workouts', response.data)
