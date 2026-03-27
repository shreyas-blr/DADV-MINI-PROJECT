# -------------------------------
# Crop Recommendation System
# -------------------------------

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC

from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.preprocessing import StandardScaler
import pickle

# -------------------------------
# 1. Load Dataset
# -------------------------------
df = pd.read_csv("Crop_recommendation.csv")

print("Dataset Loaded Successfully\n")
print(df.head())

# -------------------------------
# 2. Data Preparation
# -------------------------------
X = df.drop('label', axis=1)
y = df['label']

# -------------------------------
# 3. Train-Test Split
# -------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# -------------------------------
# 4. Feature Scaling
# -------------------------------
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# -------------------------------
# 5. Train Multiple Models
# -------------------------------
models = {
    "Logistic Regression": LogisticRegression(max_iter=500),
    "Decision Tree": DecisionTreeClassifier(),
    "Random Forest": RandomForestClassifier(n_estimators=100),
    "KNN": KNeighborsClassifier(n_neighbors=5),
    "Naive Bayes": GaussianNB(),
    "SVM": SVC()
}

print("\nModel Accuracy:\n")

results = {}

for name, model in models.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    results[name] = acc
    print(f"{name}: {acc:.4f}")

# -------------------------------
# 6. Best Model (Random Forest)
# -------------------------------
best_model = RandomForestClassifier(n_estimators=100)
best_model.fit(X_train, y_train)

y_pred = best_model.predict(X_test)

print("\nBest Model (Random Forest) Results:")
print("Accuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:\n", classification_report(y_test, y_pred))

# -------------------------------
# 7. Confusion Matrix
# -------------------------------
cm = confusion_matrix(y_test, y_pred)

plt.figure(figsize=(10,7))
sns.heatmap(cm, cmap='Blues')
plt.title("Confusion Matrix")
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.show()

# -------------------------------
# 8. Feature Importance
# -------------------------------
importance = best_model.feature_importances_
features = X.columns

plt.figure(figsize=(8,5))
plt.barh(features, importance)
plt.title("Feature Importance")
plt.xlabel("Importance Score")
plt.show()

# -------------------------------
# 9. Prediction Function
# -------------------------------
def predict_crop(N, P, K, temp, humidity, ph, rainfall):
    data = np.array([[N, P, K, temp, humidity, ph, rainfall]])
    data = scaler.transform(data)
    prediction = best_model.predict(data)
    return prediction[0]

# -------------------------------
# 10. Example Prediction
# -------------------------------
result = predict_crop(90, 42, 43, 21, 82, 6.5, 200)
print("\nRecommended Crop:", result)

# -------------------------------
# 11. Save Model
# -------------------------------
pickle.dump(best_model, open("crop_model.pkl", "wb"))
pickle.dump(scaler, open("scaler.pkl", "wb"))

print("\nModel saved successfully!")

