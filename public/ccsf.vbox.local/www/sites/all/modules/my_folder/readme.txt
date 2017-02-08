URLs to call specific functions
_______________________________

1.)Add one item to my folder

	my-folder/add/$type/$id

2.)Remove one permit or document from my folder

	my-folder/remove-single/$type/$id

3.)Remove all of a type from my folder

	my-folder/remove-all/$type

4.)Remove one item from a starter kit that has been added to my folder

	my-folder/remove-single-kit-item/$kitID/$sectionID/$itemID

5.)Remove one whole starter kit from my folder
	
	my-folder/remove-kit/%kitID

6.)Send an email containing a list of your my folder contents
and a link back to my folder that will reconstruct everything
you added before

	my-folder/mail

7.)Download any number of a single type of item from my folder
	
	my-folder/download-single/$type/$items      ($items is a comma seperated list of ID's of the items to download)

