import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Calendar, Shield } from "lucide-react";

const TestAuthPage = () => {
  const { currentUser, userProfile, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-white to-blue-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-xl border-white/30 shadow-large">
            <CardHeader>
              <CardTitle className="text-2xl">Authentication Test Page</CardTitle>
              <CardDescription>
                This page shows the current authentication status and user information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentUser ? (
                <>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-green-700">Authenticated</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">User Information</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">
                            <strong>UID:</strong> {currentUser.uid}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">
                            <strong>Email:</strong> {currentUser.email}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">
                            <strong>Email Verified:</strong> 
                            <Badge variant={currentUser.emailVerified ? "default" : "secondary"} className="ml-2">
                              {currentUser.emailVerified ? "Yes" : "No"}
                            </Badge>
                          </span>
                        </div>
                      </div>
                    </div>

                    {userProfile && (
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Profile Information</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">
                              <strong>Display Name:</strong> {userProfile.displayName || "Not set"}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">
                              <strong>First Name:</strong> {userProfile.firstName || "Not set"}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">
                              <strong>Last Name:</strong> {userProfile.lastName || "Not set"}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">
                              <strong>Created:</strong> {new Date(userProfile.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">
                              <strong>Last Login:</strong> {new Date(userProfile.lastLoginAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Shield className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">
                              <strong>Provider:</strong> {userProfile.provider}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-4">
                      <Button onClick={signOut} variant="destructive">
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-3">
                    <Shield className="w-5 h-5 text-red-500" />
                    <span className="font-medium text-red-700">Not Authenticated</span>
                  </div>
                  <p className="text-muted-foreground">
                    Please sign in to see your user information.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TestAuthPage;
