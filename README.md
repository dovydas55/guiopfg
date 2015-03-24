####Important Notes:
This git repository will not contain any external dependancies! Therefore, every time the project is CLONED you must download and install all dependancies first. You can do this using the following commands:
  * npm -d install <= to install all npm dependancies
  * bower install  <= to install all bower dependancies

This project must be lint free as well as to compress javascript and css
  * grunt <= this will run all relevant grunt tasks

To run the client on port 8000 (python 3):
  * python3 -m http.server 8000 (mac)
  * python -m http.server 8000 (windows)

To run the client on port 8000 (python 2):
  * python -m SimpleHTTPServer 8000

####Essential git commands:
  * git branch -d the_local_branch <= remove the branch locally (for cleaning up cache)
  * git push origin --delete <branchName> <= delete the branch
  * git checkout -b name_of_the_branch <= create branch
  * git push/pull origin name_of_branch <= push/pull to remove branch
  * git checkout branch_name <= switch branch
  * git reset --hard  <= WILL DELETE YOUR WORKING DIRECTORY CHANGES
  * git push -f origin HEAD^:master <= delete commit

####Import content!
  * PLACE ALL IMPORTANT LINKS HERE

####REST NOTES
  In REST we should be using HTTP methods to manipulate resources!
   * GET <= get data from resource
   * POST <= add new resource
   * DELETE <= delete data from resource
   * PUT <= update resource

REST also supports filters:
 /api/songs?publishyear=1985 <= ? is used for matching

Status codes:
 * 200 <= OK
 * 30X <= resource has been moved or cannot be found
 * 40X <= client errors (400 bad request when parameters are illegal, 401 Unauthorrized, in other words require authorization, but we do not suply it, like when we refreshed page in CHAT program! It crashed because of this reason)
 * 50X server errors
