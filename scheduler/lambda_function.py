from scrapinghub import ScrapinghubClient

API_KEY = "07ec00f17cef4ca6810c34c5f5f60970"
PROJECT_ID = 695165

def handler(event, context):
    """Runs the spiders in zyte cloud"""

    client = ScrapinghubClient(API_KEY)

    # Get the project
    project = client.get_project(PROJECT_ID)

    # Get a list of spiders in the project
    spiders = project.spiders.list()

    # Schedule runs for all spiders
    for spider in spiders:
        job = project.jobs.run(spider=spider['id'])

        # Print the run information
        print(f"Scheduled run for spider: {spider['id']}")
        print("Job ID:", job.key)

    return {
        'statusCode': 200,
        'body': 'Spiders scheduled for execution'
    }